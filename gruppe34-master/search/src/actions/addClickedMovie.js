
export const addClickedMovie = (data) => ({
  type: 'ADD_CLICKED_MOVIE',
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
  ntnuVotes: data.ntnuVotes,
})
