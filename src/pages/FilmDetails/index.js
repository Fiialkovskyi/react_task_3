import React, { useContext, useEffect, useReducer, useState, useCallback } from "react";
import { useParams } from "react-router";
import Loader from "components/Loader";
import ServerError from "components/ServerError";
import filmsApiService from "services/films";
import planetsApiService from "services/planets";
import { getFilmImageUrl, getDefaultImage } from "../../utils";
import { errorFetch, startFetch, successFetch } from "./state/actions";
import reducer from "./state/reducer";
import FilmInfoRow from "./components/FilmInfoRow";
import RelatedCharacters from "./components/RelatedCharacters";
import RelatedPlanets from "./components/RelatedPlanets";

const FilmDetails = () => {
  const { id } = useParams();
  const getFilm = filmsApiService.getFilm;
  const defaultImageUrl = getDefaultImage();

  const initialState = {
    fetching: false,
    error: false,
    filmInfo: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetching, error, film } = state;
  const [characterInfo, setCharacterInfo] = useState([]);
  const [charactersIsLoading, setCharactersIsLoading] = useState(true);
  const [planetInfo, setPlanetInfo] = useState([]);
  const [planetsIsLoading, setPlanetsIsLoading] = useState(true);;

  
  useEffect(() => {
    (async () => {
      dispatch(startFetch());

      try {
        const info = await getFilm(id).then(res => res.json());
        if(info.detail !== "Not found") {
          dispatch(successFetch(info));
        } else {
          dispatch(errorFetch());
        }
      } catch {
        dispatch(errorFetch());
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!film?.characters) return;

    const peoplePromises = film?.characters.map(url => {
      const peopleId = url.replace(/^[\D]+|\/$/g, '');

      return filmsApiService.getCharacter(peopleId).then(res => res.json());
    });

    (async () => {
      let peopleFullInfo = await Promise.allSettled(peoplePromises);

      peopleFullInfo = peopleFullInfo
        .map(({ status, value }) => {
          return status === 'fulfilled' ? value : null;
        })
        .filter(info => info);

      setCharacterInfo(peopleFullInfo);
      setCharactersIsLoading(false)
    })();
  }, [film?.characters]);

  useEffect(() => {
    if (!film?.planets) return;

    const planetPromises = film?.planets.map(url => {
      const planetId = url.replace(/^[\D]+|\/$/g, '');

      return planetsApiService.getPlanet(planetId).then(res => res.json());
    });

    (async () => {
      let planetFullInfo = await Promise.allSettled(planetPromises);

      planetFullInfo = planetFullInfo
        .map(({ status, value }) => {
          return status === 'fulfilled' ? value : null;
        })
        .filter(info => info);

        setPlanetInfo(planetFullInfo);
      setPlanetsIsLoading(false);
    })();
  }, [film?.planets]);

  const onImageLoadError = useCallback((e) => {
    if (e.target.src !== defaultImageUrl) {
      e.target.src = defaultImageUrl;
    }
  }, []);

  if (fetching) return <Loader />;
  if (error) return <ServerError />;
  if(!film) return '';
  console.log(film);

  return (
    <div className="film-details">
      <div className="film-details__film-info jumbotron">
        <img src={getFilmImageUrl(id)} onError={onImageLoadError} className="film-info__image" alt=""/>
        <div className="film-info__content"> 
          <h2>{film.title}</h2>
          <FilmInfoRow title={'Year Created:'} description={new Date().getFullYear(film.created)}/>
          <FilmInfoRow title={'Director:'} description={film.director}/>
          <FilmInfoRow title={'Producer(s):'} description={film.producer}/>
          <FilmInfoRow title={'Description:'} description={film.opening_crawl}/>
        </div>
      </div>
      <div className="film-details__related">
        <RelatedCharacters characters={characterInfo} isLoading={charactersIsLoading}/>
        <RelatedPlanets planets={planetInfo} isLoading={planetsIsLoading}/>
      </div>
    </div>
  ); 
};

export default FilmDetails;
