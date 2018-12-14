let initstate = [];

export default function fromFilterReducer(state = initstate, action){
  switch(action.type){
    case 'FROM_FILTER':
    return {...state,
        fromFilter: action.fromFilter
      }
    default:
    return state;
  }
}
