
export default function changeSortingReducer(state = '', action){
  switch(action.type){
    case 'CHANGE_SORTING':
    return {...state,
        sorting: action.sorting
      }
    default:
    return state
  }
}
