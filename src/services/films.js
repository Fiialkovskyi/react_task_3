const apiHost = process.env.REACT_APP_SW_API_HOST;

class filmsApiService  {
    getFilms = async page => fetch(`${apiHost}/films/?page=${page}`);
    getFilm = async id => fetch(`${apiHost}/films/${id}/`);
    getCharacter = async id => fetch(`${apiHost}/people/${id}/`);
}

export default new filmsApiService();