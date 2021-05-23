import { combineReducers } from 'redux'

import planetsReducer from "./planets";
import filmsReduser from "./films";

export default combineReducers({
  planets: planetsReducer,
  films: filmsReduser,
});
