let initstate = [];

export default function toFilterReducer(state = initstate, action){
  switch(action.type){
    case 'TO_FILTER':
    return {...state,
        toFilter: action.toFilter
      }
    default:
    return state;
  }
}
