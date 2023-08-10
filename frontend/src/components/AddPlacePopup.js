import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm ';

function AddPlacePopup(props) {
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  function handleAddPlaceName(e) {
    setPlace(e.target.value);
  }

  function handleAddPlaceLink(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: place,
      link: link,
    });
  }

  useEffect(() => {
    setPlace('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      textSaveButton="Создать"
      textSavingButton="Сохранение..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onEscClose={props.onEscClose}
      onSubmit={handleAddPlaceSubmit}
      isLoading={props.isLoading}
    >
      <input
        type="text"
        className="popup__input popup__input_type_place"
        id="place"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleAddPlaceName}
        value={place}
      />
      <span className="popup__input-error place-error"></span>
      <input
        id="link"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        required
        type="url"
        onChange={handleAddPlaceLink}
        value={link}
      />
      <span className="popup__input-error link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
