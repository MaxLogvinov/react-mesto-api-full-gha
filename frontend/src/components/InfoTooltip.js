import React from 'react';
import { useNavigate } from 'react-router-dom';
import success from '../images/Success.svg';
import fail from '../images/Fail.svg';

function InfoTooltip({ isOpen, onClose, onEscClose, isRegistered }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isOpen && isRegistered) {
      document.addEventListener('keydown', onEscClose);
      navigate('/sign-in', { replace: true });
      return () => document.removeEventListener('keydown', onEscClose);
    }
    if (isOpen) {
      document.addEventListener('keydown', onEscClose);
      return () => document.removeEventListener('keydown', onEscClose);
    }
    //eslint-disable-next-line
  }, [isOpen]);

  function redirectPopup() {
    if (isRegistered) {
      navigate('/sign-in', { replace: true });
    }
    onClose();
  }

  return (
    <section
      className={`popup  ${isOpen ? 'popup_opened' : ''}`}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_type_infoTooltip"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close-button"
          onClick={redirectPopup}
        ></button>
        <img
          src={isRegistered ? `${success}` : `${fail}`}
          alt="уведомление о статусе регистрации"
        />
        <h2 className="popup__title popup__title_type_infoTooltip">
          {isRegistered
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
