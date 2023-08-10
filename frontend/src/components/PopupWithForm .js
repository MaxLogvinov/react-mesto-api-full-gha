import React from 'react';

function PopupWithForm(props) {
  React.useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keydown', props.onEscClose);
      return () => document.removeEventListener('keydown', props.onEscClose);
    }
  }, [props.isOpen, props.onEscClose]);

  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
      onClick={props.onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={`popup__form-${props.name}`}
          className="popup__form"
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className={`popup__save-button popup__save-button_type_${props.name} `}
          >
            {/* {props.textSaveButton || 'Сохранить'} */}
            {props.isLoading ? props.textSavingButton : props.textSaveButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
