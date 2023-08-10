import headerLogo from '../images/logo-white.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({
  isLoggedIn,
  email,
  onSignOut,
  isMobileMenuOpen,
  handleMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const location = useLocation();

  function toggleMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      {isMobileMenuOpen ? (
        <>
          <header className="header header_active">
            <div className="header__line">
              {location.pathname === '/' && isLoggedIn === true && (
                <p className="header__menu-email header__menu-email_disabled">
                  {email}
                </p>
              )}
              {location.pathname === '/' && isLoggedIn === true && (
                <Link
                  to="/sign-in"
                  className="header__menu-item header__menu-item_disabled"
                  onClick={onSignOut}
                >
                  Выйти
                </Link>
              )}
            </div>
            <div className="header__logo-container">
              <img
                className="header__logo"
                src={headerLogo}
                alt="Логотип проекта Место"
              />
              <div className="header__menu">
                {location.pathname === '/' && isLoggedIn === true && (
                  <button
                    className="header__menu-close"
                    onClick={toggleMenu}
                  ></button>
                )}
              </div>
            </div>
          </header>
        </>
      ) : (
        <>
          <header className="header ">
            <img
              className="header__logo"
              src={headerLogo}
              alt="Логотип проекта Место"
            />
            <div className="header__container">
              {location.pathname === '/' && isLoggedIn === true && (
                <p className="header__menu-email header__menu-email_disabled">
                  {email}
                </p>
              )}
              {location.pathname === '/' && isLoggedIn === true && (
                <Link
                  to="/sign-in"
                  className="header__menu-item header__menu-item_disabled"
                  onClick={onSignOut}
                >
                  Выйти
                </Link>
              )}
            </div>
            <div className="header__menu">
              {location.pathname === '/' && isLoggedIn === true && (
                <button
                  className="header__menu-burger"
                  onClick={handleMobileMenuOpen}
                >
                  <span className="header__menu-burger-item"></span>
                  <span className="header__menu-burger-item"></span>
                  <span className="header__menu-burger-item"></span>
                </button>
              )}
              {location.pathname === '/sign-in' && (
                <Link to="/sign-up" className="header__menu-item">
                  Регистрация
                </Link>
              )}
              {location.pathname === '/sign-up' && (
                <Link to="/sign-in" className="header__menu-item">
                  Войти
                </Link>
              )}
            </div>
          </header>
        </>
      )}
    </>
  );
}

export default Header;
