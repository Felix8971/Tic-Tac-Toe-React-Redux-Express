import { combineReducers } from 'redux'

const gridReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_GRID':
      //const _state =  Object.assign([], state);//You must always return a new object
      //debugger;
      //const _state =  [...action.data];
      return action.data;
    default:
      return state
  }
}

export default combineReducers({
  gridReducer,
})
