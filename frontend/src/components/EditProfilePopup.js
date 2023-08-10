import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm ';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textSaveButton="Сохранить"
      textSavingButton="Сохранение..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onEscClose={props.onEscClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        id="name"
        name="userName"
        placeholder="Введите имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-error popup__input-error_type_name"></span>
      <input
        type="text"
        className="popup__input popup__input_type_occupation"
        id="occupation"
        name="userDescription"
        placeholder="Введите профессию"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error occupation-error popup__input-error_type_occupation"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
