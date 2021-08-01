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

export const registerUser = (payload, redirectUrl) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/sign-up', payload);
    dispatch(registerRequest(data));
    window.location.href = redirectUrl;
  } catch (error) {
    dispatch(
      setNotification({
        message: 'ops! something went wrong, please try again later.',
        type: 'error',
      }),
    );
  }
};

export const loginUser =
  ({ email, password }, redirectUrl) => async (dispatch) => {
    try {
      const { data } = await axios({
        url: '/auth/sign-in',
        method: 'post',
        auth: {
          username: email,
          password,
        },
      });

      document.cookie = `email=${data.user.email}`;
      document.cookie = `name=${data.user.name}`;
      document.cookie = `id=${data.user.id}`;
      dispatch(loginRequest(data.user));
      window.location.href = redirectUrl;
    } catch (error) {
      dispatch(
        setNotification({
          message: 'ops! something went wrong, please try again later.',
          type: 'error',
        }),
      );
    }
  };

export const registerMyFavoriteMovie =
  (movie) => async (dispatch, getState) => {
    try {
      const { myList } = getState();
      const existMovieInMyFavorites = myList.find(
        (favorite) => favorite.movie._id === movie._id,
      );

      if (existMovieInMyFavorites) return;
      const { data } = await axios.post('/user-movies', { movieId: movie._id });

      dispatch(setFavorite({ _id: data.data, movie }));
    } catch (error) {
      dispatch(
        setNotification({
          message: 'ops! something went wrong, please try again later.',
          type: 'error',
        }),
      );
    }
  };

export const removeMovieFromMyFavorites =
  (movieId) => async (dispatch, getState) => {
    try {
      const { myList } = getState();
      const userMovie = myList.find(
        (favorite) => favorite.movie._id === movieId,
      );
      await axios.delete(`/user-movies/${userMovie._id}`);

      dispatch(deleteFavorite(userMovie._id));
    } catch (error) {
      dispatch(
        setNotification({
          message: 'ops! something went wrong, please try again later.',
          type: 'error',
        }),
      );
    }
  };
