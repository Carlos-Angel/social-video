export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_FAVORITE':
      const exists = state.myList.find((item) => item.id === action.payload.id);

      if (exists) {
        return { ...state };
      }

      return {
        ...state,
        myList: [...state.myList, action.payload]
      };
      break;
    case 'DELETE_FAVORITE':
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload)
      };
      break;
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload
      };
      break;
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload
      };
      break;
    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload
      };
      break;
    default:
      return state;
      break;
  }
}
