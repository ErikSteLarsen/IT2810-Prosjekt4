import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MovieItem } from "../../src/components/movieitem";
import renderer from "react-test-renderer";

/* Mock a movie from store */
const clickedMovie = [
  {
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
  }
];

const mocks = [];
describe("Test a movieItem component", () => {
  it("renders without error", () => {
    const tree = renderer
      .create(
        <MockedProvider mocks={mocks}>
          <MovieItem
            title={clickedMovie[0].Title}
            year={clickedMovie[0].Year}
            key={clickedMovie[0].Title}
            clickedMovie={clickedMovie}
          />
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
