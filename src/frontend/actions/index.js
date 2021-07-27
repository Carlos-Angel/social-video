import axios from 'axios';

export function setFavorite(payload) {
  return {
    type: 'SET_FAVORITE',
    payload,
  };
}

export function deleteFavorite(payload) {
  return {
    type: 'DELETE_FAVORITE',
    payload,
  };
}

export function loginRequest(payload) {
  return {
    type: 'LOGIN_REQUEST',
    payload,
  };
}

export function logoutRequest(payload) {
  return {
    type: 'LOGOUT_REQUEST',
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: 'REGISTER_REQUEST',
    payload,
  };
}

export function getVideoSource(payload) {
  return {
    type: 'GET_VIDEO_SOURCE',
    payload,
  };
}

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      .post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = '/login';
      })
      .catch((error) => dispatch(setError(error)));
  };
};
