
// Tar inn alle filmene som ble fetchet fra query og setter de til "title".
// data.title er et array med alle film-objektene.
// Setter hele dette arrayet til staten.

export const addMoviesToStore = (data) => ({
  type: 'ADD_MOVIES',
  title: data.title
})
