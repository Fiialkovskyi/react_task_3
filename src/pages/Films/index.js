import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFilms } from "actions/films";
import FilmItem from "./components/FilmItem";
import Loader from "components/Loader";
import Pager from "components/Pager";
import ServerError from "components/ServerError";
import { getDefaultImage, getFilmId, getFilmImageUrl } from "../../utils";

const Films = () => {
  const dispatch = useDispatch();
  const { films, fetchingFilms, filmsError } = useSelector(
    (state) => state.films
  );

  const [page, setPage] = useState(1);
  const { next, previous, results } = films || {};
  const defaultImageUrl = getDefaultImage();

  const onImageLoadError = useCallback((e) => {
    if (e.target.src !== defaultImageUrl) {
      e.target.src = defaultImageUrl;
      e.target.classList.add("img-placeholder");
    }
  }, []);

  const handleClickNext = (e) => {
    e.preventDefault();
    if (next) setPage(page + 1);
  };
  const handleClickPrev = (e) => {
    e.preventDefault();
    if (previous) setPage(page - 1);
  };

  useEffect(() => {
    dispatch(loadFilms(page));
  }, [page, dispatch]);

  return (
    <div>
      <h1>Star Wars Films</h1>

      {fetchingFilms && <Loader />}
      {filmsError && <ServerError />}

      <div className="film__wrapper">
        {results &&
          results.map((item, index) => {
            const film = { ...item };
            film.id = getFilmId(item.url);
            film.imgUrl = getFilmImageUrl(film.id);

            return <FilmItem key={index} film={film} />;
          })}
      </div>
      <Pager
        previous={previous}
        next={next}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
      />
    </div>
  );
};

export default Films;
