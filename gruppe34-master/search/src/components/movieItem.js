import React, { Component } from "react";
import { withApollo, graphql } from "react-apollo";
import { compose } from "redux";
import { connect } from "react-redux";
import "../stylesheets/movieItem.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { addClickedMovie } from "../actions/addClickedMovie";
import { getSpecifiedTitleQuery, updateRanking } from "../queries/queries.js";

/**
 *
 * @author Erik
 * Eksporterer også en ukoblet komponent for testing
 */

export class MovieItem extends Component {
  /*
   *  Bruker vanlig statehandling i redux ettersom dette er veldig enkel
   *  håndtering av noen få lokale variabler.
   *  State-handling av "MODAL"-komponenten vår.
   *  Mer om dette er forklart i README.MD.
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputRating: ""
    };
  }

  /* Denne funksjonen laster inn mer data om det spesifikke elementet
   * du trykker på og viser det i en MODAL-komponent.
   */
  handleOpen = data => {
    this.props.client
      .query({
        query: getSpecifiedTitleQuery,
        variables: {
          Title: data
        }
      })
      .then(res => {
        this.props.dispatch(addClickedMovie(res.data.title[0]));
        this.setState({ open: true });
      });
  };

  /* Denne funksjonen lukker MODAL-komponenten.
   */
  handleClose = () => {
    // Bruker vanlig statehandling i redux ettersom dette er veldig enkel
    // håndtering av state og bare er mer jobb å fikse i redux.
    // State-handling av "MODAL"-komponenten vår.
    this.setState({ open: false });
  };

  /* Erstatter tittelen en liten endring dersom den er for lang.  */
  fillTitle = title => {
    if (title.length > 40) {
      return title.substring(0, 40) + "...";
    } else {
      return title;
    }
  };

  /* Denne funksjonen sørger for at man ikke kan putte inn
     feil values når man skal skrive inn en rating   */
  setInputValue = value => {
    let re = /[0-9]*\.?[0-9]+/g;
    let valueInsert = "";
    if (re.test(value.toString()) && value >= 0 && value <= 10) {
      valueInsert = value;
    }
    this.setState({ inputRating: valueInsert });
  };

  /* Denne funksjonen gjører en mutation opp mot databasen
     som sørger for en endring når man legger til en rating
     på en film. Her regnes det ut gjennomsnittlig rating osv.*/
  addRatingToMovie = () => {
    let ntnuVotes = this.props.clickedMovie.ntnuVotes;
    let ntnuRating = this.props.clickedMovie.ntnuRating;
    let userRating = this.state.inputRating.toString();

    if (ntnuRating === null) {
      ntnuRating = "0";
    }

    if (userRating !== "") {
      this.props.client
        .mutate({
          mutation: updateRanking,
          variables: {
            Title: this.props.clickedMovie.Title,
            ntnuVotes: ntnuVotes,
            ntnuRating: ntnuRating,
            userRating: userRating
          }
        })
        .then(res =>
          this.props.dispatch(addClickedMovie(res.data.updateRanking))
        );
    } else {
      alert("Please insert a correct value.");
    }
  };

  // Render function.
  render() {
    const marginBottomLast = {
      marginBottom: "5px",
      borderBottom: "1px solid",
      width: "100%"
    };
    const setText = {
      fontWeight: "bold"
    };
    const titleStyle = {
      fontWeight: "bold",
      marginBottom: "20px"
    };
    const boldText2 = {
      fontWeight: "bold"
    };
    const year = {
      fontSize: "13px"
    };
    const movieItem = {
      backgroundColor: "rgb(250, 250, 250)",
      cursor: "pointer",
      userSelect: "none"
    };
    return (
      <React.Fragment>
        <Card
          style={movieItem}
          className="movieItem"
          id={this.props.title}
          onClick={data => this.handleOpen(this.props.title)}
          data-cy="movie_item"
        >
          <CardContent data-cy="card">
            <Typography style={boldText2} data-cy="title">
              {this.fillTitle(this.props.title)}
            </Typography>
            <Typography style={year} variant="subtitle1" color="textSecondary">
              {this.props.year}
            </Typography>
          </CardContent>
        </Card>

        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className="modal" data-cy="result_modal">
            <Typography style={titleStyle} variant="h5">
              {this.props.clickedMovie.Title}
            </Typography>
            <Typography style={boldText2} variant="subtitle1">
              Released:
            </Typography>
            <Typography style={marginBottomLast} variant="subtitle1">
              {this.props.clickedMovie.Released}
            </Typography>
            <Typography style={boldText2} variant="subtitle1">
              Runtime:
            </Typography>
            <Typography style={marginBottomLast} variant="subtitle1">
              {this.props.clickedMovie.Runtime}
            </Typography>
            <Typography style={boldText2} variant="subtitle1">
              Genre:
            </Typography>
            <Typography style={marginBottomLast} variant="subtitle1">
              {this.props.clickedMovie.Genre}
            </Typography>
            <Typography style={boldText2} variant="subtitle1">
              Director:
            </Typography>
            <Typography style={marginBottomLast} variant="subtitle1">
              {this.props.clickedMovie.Director}
            </Typography>
            <Typography style={boldText2} variant="subtitle1">
              Awards:
            </Typography>
            <Typography style={marginBottomLast} variant="subtitle1">
              {this.props.clickedMovie.Awards}
            </Typography>
            <Typography style={boldText2} variant="subtitle1">
              Average NTNU Rating:
            </Typography>
            <Typography style={marginBottomLast} variant="subtitle1">
              {Math.round(this.props.clickedMovie.ntnuRating * 100) / 100}
            </Typography>

            <button
              className="closeButton"
              onClick={this.handleClose}
              data-cy="button_close"
            >
              X
            </button>

            <Typography style={setText} variant="subtitle1">
              Set rating for this movie (0-10):
            </Typography>
            <input
              placeholder="e.g. 9,4"
              onChange={event => this.setInputValue(event.target.value)}
              value={this.state.inputRating}
              max="10"
              min="0"
              className="inputRating"
              type="number"
              data-cy="ntnu_rating_input"
            />
            <button
              type="submit"
              className="buttonRating"
              onClick={this.addRatingToMovie}
            >
              Set Rating
            </button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

// For å få tilgang til store med connect lenger ned.
const mapStateToProps = state => {
  return {
    moviesStore: state.moviesStore,
    text: state.changeSearch,
    clickedMovie: state.clickedMovie
  };
};

//Wrapping av komponent med begge providerene våres. (Apollo og Redux).
export default compose(
  graphql(updateRanking, {
    name: "updateRanking",
    options: { refetchQueries: ["getSpecifiedTitleQuery"] }
  }),
  withApollo,
  connect(mapStateToProps)
)(MovieItem);
