// const { REACT_API_URL = 'http://localhost:4000/' } = process.env;
const REACT_API_URL = 'https://api.maxmesto.nomoreparties.co/';
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  setAvatar(avatarLink) {
    return fetch(`${this._url}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ avatar: avatarLink.avatar }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'PUT',
        credentials: 'include',
      }).then((res) => {
        return this._checkResponse(res);
      });
    } else {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE',
        credentials: 'include',
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  }
}

const api = new Api({
  url: REACT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
