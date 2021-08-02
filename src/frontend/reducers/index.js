export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_FAVORITE': {
      return {
        ...state,
        myList: [...state.myList, action.payload],
        loading: false,
        error: false,
      };
    }
    case 'DELETE_FAVORITE':
      return {
        ...state,
        myList: state.myList.filter((items) => items._id !== action.payload),
        loading: false,
        error: false,
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false,
      };
    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false,
      };
    case 'GET_VIDEO_SOURCE':
      return {
        ...state,
        loading: false,
        error: false,
        playing:
          state.trends.find((item) => item._id === action.payload) ||
          state.originals.find((item) => item._id === action.payload) ||
          [],
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: {
          message: action.payload.message,
          type: action.payload.type,
        },
        loading: false,
        error: false,
      };
    case 'LOADING':
      return {
        ...state,
        notification: { message: '', type: '' },
        loading: true,
        error: false,
      };
    case 'CLEAN_NOTIFICATION':
      return {
        ...state,
        notification: { message: '', type: '' },
        loading: false,
        error: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        notification: {
          message: action.payload.message,
          type: action.payload.type,
        },
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
