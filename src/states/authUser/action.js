/* eslint-disable import/no-extraneous-dependencies */
/**
 * @TODO: Define all the actions (creator) for the authUser state
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_TYPE: 'SET_AUTH_TYPE',
  UNSET_AUTH_TYPE: 'UNSET_AUTH_TYPE',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_TYPE,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_TYPE,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ id, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ id, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator);
    api.putAccessToken('');
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
