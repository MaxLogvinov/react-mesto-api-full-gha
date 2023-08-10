import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <button
              type="button"
              onClick={props.onEditAvatar}
              className="profile__avatar-button"
            ></button>
          </div>
          <div className="profile__container">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__occupation">{currentUser.about}</p>
            </div>
            <button
              type="button"
              onClick={props.onEditProfile}
              className="profile__edit-button"
            ></button>
          </div>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
