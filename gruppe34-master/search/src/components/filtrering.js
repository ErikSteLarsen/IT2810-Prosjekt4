import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { compose } from "redux";
import { connect } from "react-redux";
import "../stylesheets/filtrering.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { changeSorting } from "../actions/changeSorting";
import TextField from "@material-ui/core/TextField";
import { fromFilter } from "../actions/fromFilter";
import { toFilter } from "../actions/toFilter";
import Button from "@material-ui/core/Button";

/**
 *
 * @author Erik
 */

class Filtrering extends Component {

  /* Når man endrer valget av sortering gjør denne funksjonen at det også
     endres i store.   */
  onSelectChange = event => {
    this.props.dispatch(changeSorting(event.target.value));
  };

  /* Når man endrer verdi på "fra"-årstall så sørger denne funksjonen for at
     store også endres.   */
  onFromChange = event => {
    let value = Number(event.target.value) - 1;
    this.props.dispatch(fromFilter(value));
  };

  /* Når man endrer verdi på "til"-årstall så sørger denne funksjonen for at
     store også endres.   */
  onToChange = event => {
    let value = Number(event.target.value) + 1;
    this.props.dispatch(toFilter(value));
  };
  onChangePress = event => {
    this.props.fetchFunction(event);
  };

  render() {
    // Dette er konstanter for å style Material-UI komponenter vi har brukt.
    // pga vanskelig å style de uten å direkte legge in style={puttInnKonstantHer}.
    const numberInput1 = {
      width: "100px",
      marginRight: "15px",
      marginLeft: "15px",
    };
    const numberInput2 = {
      width: "100px",
      marginRight: "15px",
      marginLeft: "15px",
    };

    const style1 = {
      backgroundColor: "#fafafa",
      height: "auto",
    };
    const updateButton = {
      width: "90px",
      height: "40px",
      backgroundColor: "#f1f1f1",
      border: "1px solid",
      borderColor: "grey",
      marginRight: "15px",
      marginLeft: "15px",
      borderRadius: "10px"
    };
    const styleOptions = {
      marginRight: "15px",
      marginLeft: "15px",
    }
    return (
      <Card style={style1} className="infoBox">
        <CardContent className="cardClass">
          <div className="filteringContainer">
            <TextField
              id="standard-select-currency-native"
              select
              label="Select sorting"
              onChange={this.onSelectChange}
              SelectProps={{
                native: true
              }}
              margin="normal"
              style={styleOptions}
            >
              <option value="Default_sorting">Sort by ranking</option>
              <option value="Title_ASC">Title ASC</option>
              <option value="Title_DESC">Title DESC</option>
              <option value="Year_ASC">Year ASC</option>
              <option value="Year_DESC">Year DESC</option>
            </TextField>

            <TextField
              style={numberInput1}
              id="standard-number"
              label="From year:"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              placeholder="1900"
              onChange={this.onFromChange}
              margin="normal"
              data-cy="sort_from_year"
            />

            <TextField
              style={numberInput2}
              id="standard-number2"
              label="To year:"
              type="number"
              placeholder="2018"
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.onToChange}
              margin="normal"
              data-cy="sort_to_year"
            />

            <Button
              style={updateButton}
              onClick={event => this.onChangePress(event)}
              data-cy="update_filter_btn"
            >
              UPDATE
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

// For å få tilgang til store med connect lenger ned.
const mapStateToProps = state => {
  return {
    moviesStore: state.moviesStore,
    text: state.changeSearch,
    clickedMovie: state.clickedMovie,
    clickedMovieTitle: state.clickedMovieTitle,
    sortBy: state.sortBy,
    fromYear: state.fromFilter,
    toYear: state.toFilter
  };
};

//Wrapping av komponent med begge providerene våres. (Apollo og Redux).
export default compose(
  withApollo,
  connect(mapStateToProps)
)(Filtrering);
