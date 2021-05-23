export const getDefaultImage = () => `${process.env.REACT_APP_DEFAULT_IMG_URL}`;

export const getPlanetId = url => /planets\/(\d+)/i.exec(url)?.[1];
export const getPeopleId = url => /people\/(\d+)/i.exec(url)?.[1];
export const getFilmId = url => /films\/(\d+)/i.exec(url)?.[1];

export const getPlanetImageUrl = id =>
  `${process.env.REACT_APP_SW_VISUAL_API_HOST}/assets/img/planets/${id}.jpg`;

export const getPeopleImageUrl = id =>
  `${process.env.REACT_APP_SW_VISUAL_API_HOST}/assets/img/characters/${id}.jpg`;

export const getFilmImageUrl = id =>
  `${process.env.REACT_APP_SW_VISUAL_API_HOST}/assets/img/films/${id}.jpg`;