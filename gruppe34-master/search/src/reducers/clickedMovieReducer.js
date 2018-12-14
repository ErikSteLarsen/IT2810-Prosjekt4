const initState = []

export default function clickedMovieReducer(state = initState, action){
  switch(action.type){
    case 'ADD_CLICKED_MOVIE':
    return { ...state,
        Title: action.Title,
        Year: action.Year,
        Rated: action.Rated,
        Released: action.Released,
        Runtime: action.Runtime,
        Genre: action.Genre,
        Director: action.Director,
        Actors: action.Actors,
        Language: action.Language,
        Country: action.Country,
        Awards: action.Awards,
        ntnuRating: action.ntnuRating,
        ntnuVotes: action.ntnuVotes,
      }
    default:
    return state;
  }
}
