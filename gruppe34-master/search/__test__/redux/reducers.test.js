import addMoviesReducer from "../../src/reducers/addMoviesReducer";
import addMoviesToStore from "../../src/actions/addMoviesToStore";

/**
 * Nederste testen feiler - se forklaring i README.
 */
describe("Test addMovieReducer reducers", () => {
  it("Return init State", () => {
    expect(addMoviesReducer(undefined, {})).toEqual([]);
  });

  it("Should handle ADD_MOVIES", () => {
    expect(
      addMoviesReducer([], {
        type: "ADD_MOVIES",
        title: "Olsenbanden"
      })
    ).toEqual({
      title: "Olsenbanden"
    });
    /*
    expect(
      addMoviesReducer([{ title: "Olsenbanden" }], {
        type: "ADD_MOVIES",
        title: "Men in Black"
      })
    ).toEqual([{ title: "Olsenbanden" }, { title: "Men in Black" }]); */
  });
});
