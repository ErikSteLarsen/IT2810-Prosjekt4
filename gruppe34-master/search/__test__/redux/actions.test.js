import * as actions from "../../src/actions/addMoviesToStore";
import * as searchActions from "../../src/actions/changeSearch";
import * as changeSortActions from "../../src/actions/changeSorting";
import * as fromFilterActions from "../../src/actions/fromFilter";
import * as toFilterActions from "../../src/actions/toFilter";
import * as addClicked from "../../src/actions/addClickedMovie";

describe("Testing different redux actions", () => {
  it("should create an action to add a movie to the store", () => {
    const data = { title: "The Dark Knight" };
    const expectedAction = {
      type: "ADD_MOVIES",
      title: data.title
    };
    expect(actions.addMoviesToStore(data)).toEqual(expectedAction);
  });

  it("Should create an action to change search to the store", () => {
    const data = "The Shaw";
    const expectedAction = {
      type: "CHANGE_SEARCH",
      searchText: data
    };
    expect(searchActions.changeSearch(data)).toEqual(expectedAction);
  });

  it("test change search sort action", () => {
    const data = "Year_ASC";
    const expectedAction = {
      type: "CHANGE_SORTING",
      sorting: data
    };
    expect(changeSortActions.changeSorting(data)).toEqual(expectedAction);
  });

  it("test from filter action", () => {
    const data = "Year_ASC";
    const expectedAction = {
      type: "FROM_FILTER",
      fromFilter: data
    };
    expect(fromFilterActions.fromFilter(data)).toEqual(expectedAction);
  });

  it("test to Filter action", () => {
    const data = "Year_ASC";
    const expectedAction = {
      type: "TO_FILTER",
      toFilter: data
    };
    expect(toFilterActions.toFilter(data)).toEqual(expectedAction);
  });

  it("test to addClickedMovie action", () => {
    const data = {
      Title: "Shawshank",
      Year: "1989",
      Rated: "9.0",
      Released: "7th July 1992",
      Runtime: "120",
      Genre: "Action",
      Director: "Shuggie Otis",
      Actors: "Hal Berry, Melli Be",
      Language: "notSwedish",
      Country: "America",
      Awards: "a lot",
      ntnuRating: "9.0",
      ntnuVotes: "120"
    };
    const expectedAction = {
      type: "ADD_CLICKED_MOVIE",
      Title: data.Title,
      Year: data.Year,
      Rated: data.Rated,
      Released: data.Released,
      Runtime: data.Runtime,
      Genre: data.Genre,
      Director: data.Director,
      Actors: data.Actors,
      Language: data.Language,
      Country: data.Country,
      Awards: data.Awards,
      ntnuRating: data.ntnuRating,
      ntnuVotes: data.ntnuVotes
    };
    expect(addClicked.addClickedMovie(data)).toEqual(expectedAction);
  });
});
