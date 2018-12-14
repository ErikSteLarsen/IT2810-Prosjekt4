const initState = [];

export default function AddMoviesReducer(state = initState, action) {
  switch (action.type) {
    case "ADD_MOVIES":
      return { ...state, title: action.title };
    default:
      return state;
  }
}
