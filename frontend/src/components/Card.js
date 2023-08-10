import React from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__card" key={card._id}>
      {isOwn && (
        <button
          type="button"
          className="elements__delete-button"
          onClick={handleDeleteClick}
        />
      )}
      <div
        className="elements__image"
        style={{ backgroundImage: `url(${card.link})` }}
        alt={card.name}
        onClick={handleClick}
      ></div>
      <div className="elements__card-content">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            onClick={handleLikeClick}
            className={`elements__like ${
              isLiked ? 'elements__like_active' : ''
            }`}
          ></button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
