import React, { Component } from "react";
import "./stylesheets/app.css";
import search_icon from "./search_image.png";
import SearchResult from "./components/searchResult";
import Filtrering from "./components/filtrering";
import { withApollo } from "react-apollo";
import { compose } from "redux";
import { connect } from "react-redux";
import { addMoviesToStore } from "./actions/addMoviesToStore";
import { changeSearch } from "./actions/changeSearch";
import { fromFilter } from "./actions/fromFilter";
import { toFilter } from "./actions/toFilter";
import Button from "@material-ui/core/Button";
import { changeSorting } from "./actions/changeSorting";
import { getTitleContainingWord } from "./queries/queries.js";
import {
  getTitleWithAllOptionsByTitle,
  getTitleWithAllOptionsByYear,
  getTitleWithAllOptionsNoSort
} from "./queries/queries.js";
import right_arrow from "./right-arrow.png";
import left_arrow from "./left-arrow.png";


// Dette er konstanter for å style Material-UI komponenter vi har brukt.
// pga vanskelig å style de uten å direkte legge in style={puttInnKonstantHer}.
const back = {
  marginRight: "30px",
  marginTop: "95px",
  height: "40px",
  minWidth: "40px",
  padding: "0px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f1f1f1"
};
const backTemp = {
  marginRight: "30px",
  marginTop: "95px",
  height: "40px",
  minWidth: "40px"
};
const forTemp = {
  marginLeft: "30px",
  marginTop: "95px",
  height: "40px",
  minWidth: "40px"
};
const forward = {
  marginLeft: "30px",
  marginTop: "95px",
  height: "40px",
  minWidth: "40px",
  padding: "0px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f1f1f1"
};

class App extends Component {
  /*
     Bruker vanlig statehandling i redux ettersom dette er veldig enkel
     håndtering av noen få lokale variabler.
     State-handling av "MODAL"-komponenten vår.
     Mer om dette er forklart i README.MD.
   */
  state = {
    skip: 0,
    limit: 10,
    backwardsDisabled: true,
    forwardsDisabled: true
  };

  // Denne funksjonen er den som kjøres for at man skal kalle på en annen
  // funksjon som kjører riktig query og kjører dispatch(...) på resultatet av dette queryet.
  fetchData = (event, typeOfFetch) => {
    event.preventDefault();
    console.log("fetch data");
    this.chooseRightQuery(typeOfFetch);
  };

  /* Hovedfunksjonaliteten i denne funksjonen er en switch case der man tar høyde
     for hvilken type sortering og filtrering man har valgt, og kjører et query basert på disse valgene.
     Helt i starten av denne funksjonen setter man også default values dersom brukeren
     ikke har valgt noen verdi for sortering og filtrering.*/
  chooseRightQuery = typeOfFetch => {
    let sorting = this.props.sortBy.sorting;
    let fromFilter = this.props.fromFilter.fromFilter;
    let toFilter = this.props.toFilter.toFilter;
    let queryInput = "";
    let variablesInput = "";

    // sett default value
    if (fromFilter === -1) {
      fromFilter = 1900;
    }
    // sett default value
    if (toFilter === 1) {
      toFilter = 2050;
    }

    // Bestemmer om man skal fetche en ny side eller om det er et endret søk man gjør.
    // Dersom man skal fetche et nytt søk må man sette pagination tilbake riktig slik
    // at man kommer på side 1 av det nye queryet.
    let skip = 0;
    if (typeOfFetch === "page") {
      skip = this.state.skip;
    } else if (typeOfFetch === "reset") {
      this.setState({
        skip: 0,
        backwardsDisabled: true,
        forwardsDisabled: false
      });
      skip = 0;
    }

    // Dette er switch casen som bestemmer hvilket query som skal brukes.
    // Kaller også på setPaginateButtons fordi man må sjekke hvilken tilstand
    // pagination skal få.
    let sort = "ASC";
    switch (sorting) {
      case "Title_ASC":
        sort = "ASC";
        this.getTitleWithAllOptionsByTitle(sort, skip, fromFilter, toFilter);
        queryInput = getTitleWithAllOptionsByTitle;
        variablesInput = {
          Sort: sort,
          Title: this.props.textStore.searchText,
          Skip: skip + 10,
          Limit: this.state.limit,
          FromYear: fromFilter,
          ToYear: toFilter
        };
        this.setPaginateButtons(queryInput, variablesInput);
        break;
      case "Title_DESC":
        sort = "DESC";
        this.getTitleWithAllOptionsByTitle(sort, skip, fromFilter, toFilter);
        queryInput = getTitleWithAllOptionsByTitle;
        variablesInput = {
          Sort: sort,
          Title: this.props.textStore.searchText,
          Skip: skip + 10,
          Limit: this.state.limit,
          FromYear: fromFilter,
          ToYear: toFilter
        };
        this.setPaginateButtons(queryInput, variablesInput);
        break;
      case "Year_ASC":
        sort = "ASC";
        this.getTitleWithAllOptionsByYear(sort, skip, fromFilter, toFilter);
        queryInput = getTitleWithAllOptionsByYear;
        variablesInput = {
          Sort: sort,
          Title: this.props.textStore.searchText,
          Skip: skip + 10,
          Limit: this.state.limit,
          FromYear: fromFilter,
          ToYear: toFilter
        };
        this.setPaginateButtons(queryInput, variablesInput);
        break;
      case "Year_DESC":
        sort = "DESC";
        this.getTitleWithAllOptionsByYear(sort, skip, fromFilter, toFilter);
        queryInput = getTitleWithAllOptionsByYear;
        variablesInput = {
          Sort: sort,
          Title: this.props.textStore.searchText,
          Skip: skip + 10,
          Limit: this.state.limit,
          FromYear: fromFilter,
          ToYear: toFilter
        };
        this.setPaginateButtons(queryInput, variablesInput);
        break;
      case "":
        this.getTitleWithAllOptionsNoSort(skip, fromFilter, toFilter);
        queryInput = getTitleWithAllOptionsNoSort;
        variablesInput = {
          Title: this.props.textStore.searchText,
          Skip: skip + 10,
          Limit: this.state.limit,
          FromYear: fromFilter,
          ToYear: toFilter
        };
        this.setPaginateButtons(queryInput, variablesInput);
        break;
      case "Default_sorting":
        this.getTitleWithAllOptionsNoSort(skip, fromFilter, toFilter);
        queryInput = getTitleWithAllOptionsNoSort;
        variablesInput = {
          Title: this.props.textStore.searchText,
          Skip: skip + 10,
          Limit: this.state.limit,
          FromYear: fromFilter,
          ToYear: toFilter
        };
        this.setPaginateButtons(queryInput, variablesInput);
        break;
      default:
        console.log(sorting);
        console.log("error");
    }
  };


  /* Denne funksjonen bestemmer om pagination knappene skal vises eller ikke
     basert på om det neste queryet resulterer noen flere objekter.*/
  setPaginateButtons = (queryInput, variablesInput) => {
    this.props.client
      .query({
        query: queryInput,
        variables: variablesInput
      })
      .then(res => {
        if (res.data.title.length > 0) {
          this.setState({ forwardsDisabled: false });
        } else {
          this.setState({ forwardsDisabled: true });
        }
      });
  };

  /* Funksjon som bruker parameterene til å  kjøre et query.
     Dette er sortering basert på Tittel, som også tar in filtrering på år.
  */
  getTitleWithAllOptionsByTitle = (sort, skip, fromYear, toYear) => {
    this.props.client
      .query({
        query: getTitleWithAllOptionsByTitle,
        variables: {
          Sort: sort,
          Title: this.props.textStore.searchText,
          Skip: skip,
          Limit: this.state.limit,
          FromYear: fromYear,
          ToYear: toYear
        }
      })
      .then(res => {
        this.props.dispatch(addMoviesToStore(res.data));
      });
  };

  /* Funksjon som bruker parameterene til å  kjøre et query.
     Dette er sortering basert på År, som også tar in filtrering på år.
  */
  getTitleWithAllOptionsByYear = (sort, skip, fromYear, toYear) => {
    this.props.client
      .query({
        query: getTitleWithAllOptionsByYear,
        variables: {
          Sort: sort,
          Title: this.props.textStore.searchText,
          Skip: skip,
          Limit: this.state.limit,
          FromYear: fromYear,
          ToYear: toYear
        }
      })
      .then(res => {
        this.props.dispatch(addMoviesToStore(res.data));
      });
  };

  /* Funksjon som bruker parameterene til å  kjøre et query.
     Dette er filtrering på år (og såklart søk), men uten sortering.
  */
  getTitleWithAllOptionsNoSort = (skip, fromYear, toYear) => {
    this.props.client
      .query({
        query: getTitleWithAllOptionsNoSort,
        variables: {
          Title: this.props.textStore.searchText,
          Skip: skip,
          Limit: this.state.limit,
          FromYear: fromYear,
          ToYear: toYear
        }
      })
      .then(res => {
        this.props.dispatch(addMoviesToStore(res.data));
      });
  };

  /* Dette er funksjonen som oppdaterer store med riktig verdi for søketeksten.
     Den setter også pagination knappene tilbake til standard (skjult) når man endrer søketeksten.
  */
  changeText = data => {
    this.setState({ skip: 0, backwardsDisabled: true, forwardsDisabled: true });
    this.props.dispatch(changeSearch(data));
  };

  /* Funksjonen som gjør alle de nødvendige endringene når man skal paginere tilbake en side.
  */
  paginateBackwards = event => {
    event.persist();
    if (this.state.skip > 10) {
      this.setState({ backwardsDisabled: false, forwardsDisabled: false });
      this.setState({ skip: this.state.skip - this.state.limit }, () =>
        this.fetchData(event, "page")
      );
    } else {
      this.setState({ backwardsDisabled: true, forwardsDisabled: false }, () =>
        console.log("Kan ikke bla lenger til venstre.")
      );
      this.setState({ skip: this.state.skip - this.state.limit }, () =>
        this.fetchData(event, "page")
      );
    }
  };

  /* Funksjonen som gjør alle de nødvendige endringene når man skal paginere framover en side.
  */
  paginateForwards = event => {
    event.persist();

    this.props.client
      .query({
        query: getTitleContainingWord,
        variables: {
          Title: this.props.textStore.searchText,
          Skip: this.state.skip + 20,
          Limit: this.state.limit
        }
      })
      .then(res => {
        let nextQuery = res.data.title;
        if (nextQuery.length === 0) {
          this.setState({ forwardsDisabled: true });
          this.setState({ skip: this.state.skip + this.state.limit }, () =>
            this.fetchData(event, "page")
          );
        } else {
          this.setState({ skip: this.state.skip + this.state.limit }, () =>
            this.fetchData(event, "page")
          );
        }
        if (this.state.skip > 0) {
          this.setState({ backwardsDisabled: false });
        }
      });
  };

  /* Triggres når komponenten mounter. */
  componentDidMount() {
    this.changeText("");
    this.props.dispatch(changeSorting(""));
    this.props.dispatch(fromFilter(-1));
    this.props.dispatch(toFilter(1));
    this.setState({ forwardsDisabled: true });
  }

  /* Funksjon som bestemmer om knappen for paginering framover
     skal rendres eller ikke. */
  forwardsButton = () => {
    if (this.state.forwardsDisabled !== true) {
      return (
        <Button
          data-cy="button_next"
          variant="contained"
          onClick={event => this.paginateForwards(event)}
          color="default"
          style={forward}
        >
          <img src={right_arrow} alt="search" height="30px" width="30px" />
        </Button>
      );
    } else {
      return <div style={forTemp} />;
    }
  };

  /* Funksjon som bestemmer om knappen for paginering bakover
     skal rendres eller ikke. */
  backwardsButton = () => {
    if (this.state.backwardsDisabled !== true) {
      return (
        <Button
          data-cy="button_next"
          variant="contained"
          onClick={event => this.paginateBackwards(event)}
          color="default"
          style={back}
        >
          <img src={left_arrow} alt="search" height="30px" width="30px" />
        </Button>
      );
    } else {
      return <div style={backTemp} />;
    }
  };

  /* The render function */
  render() {
    let backButton = this.backwardsButton();
    let forwardsButton = this.forwardsButton();

    return (
      <div className="site">
        <div className="header">
          <div className="header-text">IMDb TOP 250 MOVIES</div>
        </div>

        <div className="container">
          <div className="search_box">
            <div className="search_bar">
              <form
                className="form"
                onSubmit={event => this.fetchData(event, "reset")}
              >
                <input
                  className="form_input"
                  data-cy="search_input"
                  placeholder="Search goes here..."
                  type="text"
                  onChange={event => this.changeText(event.target.value)}
                />
              </form>
            </div>
            <div
              className="search_button"
              data-cy="search_button"
              onClick={event => this.fetchData(event, "reset")}
            >
              <img src={search_icon} alt="search" height="30px" width="30px" />
            </div>
          </div>
          <Filtrering fetchFunction={event => this.fetchData(event, "reset")} />
          <div className="paginator">
            {backButton}
            <SearchResult />
            {forwardsButton}
          </div>
        </div>
      </div>
    );
  }
}

// For å få tilgang til store med connect lenger ned.
const mapStateToProps = state => {
  return {
    movies: state.moviesStore,
    textStore: state.changeSearch,
    clickedMovie: state.clickedMovie,
    sortBy: state.sortBy,
    fromFilter: state.fromFilter,
    toFilter: state.toFilter
  };
};

//Wrapping av komponent med begge providerene våres. (Apollo og Redux).
export default compose(
  withApollo,
  connect(mapStateToProps)
)(App);
