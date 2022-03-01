import * as actionTypes from '../action-types'
import {binary} from '../common-functions/common-functions'
 const initialState = {
   users: [],
 }
const getVisibleTodos = (state = initialState, action) => {
  debugger
    switch (action.type) {
      case actionTypes.STORE_DATA:
        debugger
        state.users.push(action.payload)
        return {...state};
      case actionTypes.GET_USERS:
        if (action.payload.length) {
        state.users = action.payload;
        state.user = null;
        } else if(state.users.length){
          const index = binary(action.payload._id, state.users)
          if (!index && state.users.length === 1) {
            state.users = [];
          } else {
            state.users[index] = action.payload;
          }
        }
        return {...state};
      case actionTypes.GET_USERS_BY_ID:
        state.user = action.payload;
        return {...state};
      case actionTypes.DISP_DIALOG:
        state.showDialog = action.payload;
        return {...state};
        default:
        return state;
    }
  }

  export default getVisibleTodos;