/**
 * @TODO: Define the reducer for the authUser state
 */
import { ActionType } from './action';

function authUserReducer(authUser = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_TYPE:
      return action.payload.authUser;
    case ActionType.UNSET_AUTH_TYPE:
      return null;
    default:
      return authUser;
  }
}

export default authUserReducer;
