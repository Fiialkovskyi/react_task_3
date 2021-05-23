
const reducer = (state, action) => {
    switch (action.type) {
      case 'START_FETCH_FILM':
        return { ...state, fetching: true, error: false };
      case 'FAILURE_FETCH_FILM':
        return { ...state, fetching: false, error: true };
      case 'SUCCES_FETCH_FILM':
        return {
          fetching: false,
          error: false,
          film: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;