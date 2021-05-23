import {
    FETCH_FILMS_STARTED,
    FETCH_FILMS_FAILURE,
    FETCH_FILMS_SUCCES,
} from './types';

import filmsApiService from "services/films";

const loadFilmsSucces = (films) => ({
    type: FETCH_FILMS_SUCCES,
    payload: {
        ...films,
    },
});

const loadFilmsStarted = () => ({
    type: FETCH_FILMS_STARTED,
})

const loadFilmsFailure = () => ({
    type: FETCH_FILMS_FAILURE,
});

export const loadFilms = (page = 1) => async (dispatch) => {
    dispatch(loadFilmsStarted());
    try {
        
        const films = await filmsApiService
            .getFilms(page)
            .then((res) => res.json());
        dispatch(loadFilmsSucces(films));
    } catch {
        dispatch(loadFilmsFailure());
    }
}