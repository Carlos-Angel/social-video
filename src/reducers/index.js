export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        myList: [...state.myList, action.payload]
      };
      break;
    default:
      return state;
      break;
  }
}
