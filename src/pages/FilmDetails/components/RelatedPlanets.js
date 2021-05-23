import React, {useCallback} from "react";
import { Link } from 'react-router-dom';
import { getPlanetId, getDefaultImage, getPlanetImageUrl } from '../../../utils';
import Loader from "components/Loader";

const defaultImageUrl = getDefaultImage();

const RelatedPlanets = ({ planets, isLoading }) => {
  
  const onImageLoadError = useCallback((e) => {
    if (e.target.src !== defaultImageUrl) {
      e.target.src = defaultImageUrl;
    }
  }, []);

  return (
    <div className="related__block jumbotron">
      <h3>Related Planets ({planets.length})</h3>
      {isLoading ? <Loader /> : null}
      {
        planets.map((character, index) => {
          const id = getPlanetId(character.url);
          const peopleURL = getPlanetImageUrl(id);

          return (
            <div className="related-character" key={index}>
              <img className="related-character__image" src={peopleURL} alt={character.name} onError={onImageLoadError}/>
              <Link to={`/planet/${id}`} className="related-character__name">{character.name}</Link>
            </div>
          );
        })
      }
    </div>
  );
};

export default RelatedPlanets;