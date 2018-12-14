import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { SearchResult } from "../../src/components/searchResult";
import renderer from "react-test-renderer";

const mocks = [];
const movieStore = [{ title: "hello" }, { title: "goodbye" }];

it("renders without error", () => {
  const tree = renderer
    .create(
      <MockedProvider mocks={mocks}>
        <SearchResult moviesStore={movieStore} />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
