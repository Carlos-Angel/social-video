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
        window.location.href = redirectUrl;
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export const registerMyFavoriteMovie = (movie) => {
  return (dispatch, getState) => {
    const { myList } = getState();
    const existMovieInMyFavorites = myList.find(
      (favorite) => favorite.movie._id === movie._id,
    );

    if (existMovieInMyFavorites) return;

    axios
      .post('/user-movies', { movieId: movie._id })
      .then(({ data }) => dispatch(setFavorite({ _id: data.data, movie })))
      .catch((error) => dispatch(setError(error)));
  };
};

export const removeMovieFromMyFavorites = (movieId) => {
  return (dispatch, getState) => {
    const { myList } = getState();
    const userMovie = myList.find((favorite) => favorite.movie._id === movieId);
    axios
      .delete(`/user-movies/${userMovie._id}`)
      .then(() => dispatch(deleteFavorite(userMovie._id)))
      .catch((error) => dispatch(setError(error)));
  };
};
