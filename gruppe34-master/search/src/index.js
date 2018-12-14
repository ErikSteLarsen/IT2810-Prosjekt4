import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { InMemoryCache } from "apollo-cache-inmemory";
import AddMoviesReducer from "./reducers/addMoviesReducer";
import changeSearchReducer from "./reducers/changeSearchReducer";
import clickedMovieReducer from "./reducers/clickedMovieReducer";
import changeSortingReducer from "./reducers/changeSortingReducer";
import fromFilterReducer from "./reducers/fromFilterReducer";
import toFilterReducer from "./reducers/toFilterReducer";

/**
 * Index fil for react app
 * @author: Erik, Thusan, Magnus
 */

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://it2810-34.idi.ntnu.no:4000/graphql" }),
  cache: new InMemoryCache()
});

// Combine all the reducers so that we can create the store in the next const.
// Also give the reducers names that is a bit easier to remember and use other places.
const reducers = combineReducers({
  moviesStore: AddMoviesReducer,
  changeSearch: changeSearchReducer,
  clickedMovie: clickedMovieReducer,
  sortBy: changeSortingReducer,
  fromFilter: fromFilterReducer,
  toFilter: toFilterReducer
});

// Create the Redux store with the createStore function.
const store = createStore(reducers);


// The APP component is wrapped in a Redux-provider and an Apollo-Provider.
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
