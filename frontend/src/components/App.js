import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithConfirm from './PopupWithConfirm';
import api from '../utils/Api';
import auth from '../utils/Auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import InfoTooltip from './InfoTooltip';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardDelete, setCardDelete] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link,
    });
  }

  function handleDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setCardDelete(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsConfirmPopupOpen(false);
  }

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(cardDelete._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((cardItem) => cardItem._id !== cardDelete._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCard({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setIsRegistered(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
        setIsRegistered(false);
      });
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        console.log(res);
        setIsRegistered(false);
        setEmail(email);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
        setIsLoggedIn(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  const checkToken = React.useCallback(() => {
    auth
      .getContent()
      .then((res) => {
        if (!res) {
          return;
        }
        setEmail(res.email);
        setCurrentUser(res);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  useEffect(() => {
    checkToken();
    //eslint-disable-next-line
  }, []);

  function handleSignOut() {
    auth.logOut().then((res) => {
      if (res) {
        setIsLoggedIn(false);
        setIsMobileMenuOpen(false);
        setCurrentUser('');
      }
    });
  }

  function handleMobileMenuOpen() {
    setIsMobileMenuOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          onSignOut={handleSignOut}
          isMobileMenuOpen={isMobileMenuOpen}
          handleMobileMenuOpen={handleMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegister}
                isRegistered={isRegistered}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/react-mesto-auth"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onEscClose={handleEscClose}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
          onEscClose={handleEscClose}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onEscClose={handleEscClose}
          isLoading={isLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
          onEscClose={handleEscClose}
          isLoading={isLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          onEscClose={handleEscClose}
          isRegistered={isRegistered}
          isLoggedIn={isLoggedIn}
        />
        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onEscClose={handleEscClose}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
