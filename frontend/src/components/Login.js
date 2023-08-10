import React from 'react';

function Login({ onLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue.password, formValue.email);
    setFormValue({});
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input"
          id="email"
          name="email"
          placeholder="Email"
          required
          minLength="8"
          maxLength="40"
          value={formValue.email || ''}
          onChange={handleChange}
        />
        <span className="auth__input-error auth-error" />
        <input
          type="password"
          className="auth__input"
          id="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="30"
          value={formValue.password || ''}
          onChange={handleChange}
        />
        <span className="auth__input-error auth-error" />
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
