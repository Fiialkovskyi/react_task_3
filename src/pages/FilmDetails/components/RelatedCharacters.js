import React, {useCallback} from "react";
import { Link } from 'react-router-dom';
import { getPeopleId, getPeopleImageUrl, getDefaultImage } from '../../../utils';
import Loader from "components/Loader";

const RelatedCharacters = ({ characters, isLoading }) => {
  const onImageLoadError = useCallback((e) => {
    if (e.target.src !== getDefaultImage) {
      e.target.src = getDefaultImage;
    }
  }, []);

  return (
    <div className="related__block jumbotron">
      <h3>Related Characters ({characters.length})</h3>
      {isLoading ? <Loader /> : null}
      {
        characters.map((character, index) => {
          const id = getPeopleId(character.url);
          const peopleURL = getPeopleImageUrl(id);

          return (
            <div className="related-character" key={index}>
              <img className="related-character__image" src={peopleURL} alt={character.name} onError={onImageLoadError}/>
              <Link to={`/characters/${id}`} className="related-character__name">{character.name}</Link>
            </div>
          );
        })
      }
    </div>
  );
};

export default RelatedCharacters;
