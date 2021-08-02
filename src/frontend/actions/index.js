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

export const setNotification = ({ message, type }) => ({
  type: 'SET_NOTIFICATION',
  payload: { message, type },
});

export const cleanNotification = () => ({
  type: 'CLEAN_NOTIFICATION',
});

export const loading = () => ({
  type: 'LOADING',
});

export const setError = ({ message, type }) => ({
  type: 'SET_ERROR',
  payload: { message, type },
});

export const registerUser = (payload) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.post('/auth/sign-up', payload);
    dispatch(setNotification({ message: 'successful registration', type: 'success' }));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(
      setError({
        message:
          message || 'ops! something went wrong, please try again later.',
        type: 'error',
      }),
    );
  }
};

export const loginUser =
  ({ email, password }, redirectUrl) => async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        url: '/auth/sign-in',
        method: 'post',
        auth: {
          username: email,
          password,
        },
      });
      dispatch(registerRequest({ email: data.user.email }));
      document.cookie = `email=${data.user.email}`;
      document.cookie = `name=${data.user.name}`;
      document.cookie = `id=${data.user.id}`;
      dispatch(loginRequest(data.user));
      window.location.href = redirectUrl;
    } catch (error) {
      const { message } = error.response.data;
      dispatch(
        setError({
          message:
            message || 'ops! something went wrong, please try again later.',
          type: 'error',
        }),
      );
    }
  };

export const registerMyFavoriteMovie =
  (movie) => async (dispatch, getState) => {
    dispatch(loading());
    try {
      const { myList } = getState();
      const existMovieInMyFavorites = myList.find(
        (favorite) => favorite.movie._id === movie._id,
      );

      if (existMovieInMyFavorites) return;
      const { data } = await axios.post('/user-movies', { movieId: movie._id });

      dispatch(setFavorite({ _id: data.data, movie }));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(
        setError({
          message:
            message || 'ops! something went wrong, please try again later.',
          type: 'error',
        }),
      );
    }
  };

export const removeMovieFromMyFavorites =
  (movieId) => async (dispatch, getState) => {
    dispatch(loading());
    try {
      const { myList } = getState();
      const userMovie = myList.find(
        (favorite) => favorite.movie._id === movieId,
      );
      await axios.delete(`/user-movies/${userMovie._id}`);

      dispatch(deleteFavorite(userMovie._id));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(
        setError({
          message:
            message || 'ops! something went wrong, please try again later.',
          type: 'error',
        }),
      );
    }
  };
