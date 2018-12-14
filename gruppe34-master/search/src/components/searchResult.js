import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { compose } from "redux";
import { connect } from "react-redux";
import "../stylesheets/searchResult.css";
import MovieItem from "./movieItem.js";
/*
import {addClickedMovieTitle} from '../actions/addClickedMovieTitle';
import {getAllTitlesQuery} from '../queries/queries.js';
*/

/**
 * Takes data from mobx and shows it in table
 * @author Magnus and Erik
 */

/*
This component is the component that the search result appears in.
Its a very simple component, the main thing it does is map every object fetched from the server
to a MovieItem component.
The function that transforms data is explained below.
*/

class SearchResult extends Component {

  /*
  This function transforms the array of objects in the store,
  to a 2D array cotaining Title and Year for each movie in the result.
  */
  transformData = () => {
    let data = [];
    if (this.props.moviesStore.title) {
      this.props.moviesStore.title.forEach(movie => {
        data.push([movie.Title, movie.Year]);
      });
    }
    return data;
  };

  render() {
  let data = this.transformData();
    return (
      <div className="searchResult" data-cy="search_results">
        {data.map(movie => (
          <MovieItem title={movie[0]} year={movie[1]} key={movie[0]} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moviesStore: state.moviesStore,
  }
};

export default compose(
  withApollo,
  connect(mapStateToProps)
)(SearchResult);
