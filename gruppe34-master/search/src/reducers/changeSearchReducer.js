const initState = []

export default function changeSearchReducer(state = initState, action){
  switch(action.type){
    case 'CHANGE_SEARCH':
    return { ...state,
        searchText: action.searchText
      }
    default:
    return state
  }
}
