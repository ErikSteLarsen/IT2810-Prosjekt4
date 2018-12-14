import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { Filtrering } from "../../src/components/filtrering";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = [{}];
const store = mockStore(initialState);

const mocks = [];

it("renders without error", () => {
  const tree = renderer
    .create(
      <MockedProvider mocks={mocks}>
        <Filtrering store={store} />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
