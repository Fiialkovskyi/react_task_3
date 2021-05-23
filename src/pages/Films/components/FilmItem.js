import React from "react";
import { Link } from 'react-router-dom';

const FilmItem = ({ film }) => {
  const { title, imgUrl } = film;

  return (
    <Link to={`/films/${film.id}`} className="film-item thumbnail">
      <img src={imgUrl} alt={title}></img>
      <h3>{title}</h3>
    </Link>
  );
};

export default FilmItem;
