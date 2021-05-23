import {
    FETCH_FILMS_STARTED,
    FETCH_FILMS_FAILURE,
    FETCH_FILMS_SUCCES,
  } from "actions/types";

const initialState = {
    films: null,
    fetchingFilms: false,
    filmsError: false,
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_FILMS_STARTED: {
            return {
                ...state,
                fetchingFilms: true,
                filmsError: false,
            };
        }

        case FETCH_FILMS_FAILURE: {
            return {
                ...state,
                fetchingFilms: false,
                filmsError: true,
            }
        }

        case FETCH_FILMS_SUCCES: {
            return {
                ...state,
                fetchingFilms: false,
                films: action.payload,
            }
        }

        default: {
            return state;
        } 
    }
}