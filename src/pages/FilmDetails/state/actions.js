const startFetch = () => ({
    type: 'START_FETCH_FILM',
  });
  const errorFetch = () => ({
    type: 'FAILURE_FETCH_FILM',
  });
  const successFetch = filmInfo => ({
    type: 'SUCCES_FETCH_FILM',
    payload: filmInfo,
  });
  
  export { startFetch, errorFetch, successFetch };