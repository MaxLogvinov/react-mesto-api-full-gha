// const { REACT_API_URL = 'http://localhost:4000/' } = process.env;
const { REACT_API_URL = 'http://api.maxmesto.nomoreparties.co/' } = process.env;

class Auth {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки: ${res.status}`);
    }
  }

  register(password, email) {
    return fetch(`${this._url}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  authorize(password, email) {
    return fetch(`${this._url}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  getContent() {
    return fetch(`${this._url}users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  logOut() {
    return fetch(`${this._url}logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const auth = new Auth(REACT_API_URL);

export default auth;
