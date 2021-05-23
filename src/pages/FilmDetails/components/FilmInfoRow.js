import React from "react";

const FilmInfoRow = ({ title, description }) => {
  return (
    <div className="film-info-row">
      <div className="film-info-row__title">{title}</div>
      <div className="film-info-description">{description}</div>
    </div>
  );
};

export default FilmInfoRow;
