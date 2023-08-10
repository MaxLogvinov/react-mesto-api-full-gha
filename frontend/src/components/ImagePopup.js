import React from 'react';

function ImagePopup({ card, isOpen, onClose, onEscClose }) {
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onEscClose);
      return () => document.removeEventListener('keydown', onEscClose);
    }
  }, [isOpen, onEscClose]);

  return (
    <section
      className={`popup popup-photo popup_type_photo ${
        isOpen ? 'popup_opened' : ''
      }`}
      onClick={onClose}
    >
      <div
        className="popup-photo__container popup-photo__container_type_photo"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close-button popup-photo__close-button"
          onClick={onClose}
        ></button>
        <img
          className="popup-photo__image popup-photo__image_type_photo"
          src={card.link}
          alt={card.name}
        />
        <p className="popup-photo__title popup-photo__title_type_photo">
          {card.name}
        </p>
      </div>
    </section>
  );
}

export default ImagePopup;
