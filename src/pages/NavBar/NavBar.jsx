import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch for dispatching logout
import { logout } from '../../redux/authSlice'; // Import the logout action
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPortrait, faGraduationCap, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from "./NavBar.module.css";
import iconStyles from '../../styles/Icons.module.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  // Access authentication state
  const isAuthenticated = useSelector((state) => !!state.auth.user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    toggleMenu(); // Close the menu after logout
  };

  return (
    <nav className={styles.nav}>
      <div className={menuOpen ? styles.active : ''} onClick={toggleMenu}></div>
      <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        {/* Login for unauthenticated users */}
        {!isAuthenticated && (
          <Link
            to="/login"
            className={location.pathname === '/login' ? styles.active : ''}
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon="sign-in-alt" className={`${iconStyles.icon} ${iconStyles.solid}`} />
            <span>Login</span>
          </Link>
        )}

        {/* Links for authenticated users */}
        {isAuthenticated && (
          <>
            <Link
              to="/"
              className={location.pathname === '/' ? styles.active : ''}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon="house" className={`${iconStyles.icon} ${iconStyles.solid} fas fa-house`} />
              <span>Home</span>
            </Link>
            <Link
              to="/education"
              className={location.pathname === '/education' ? styles.active : ''}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faGraduationCap} className={`${iconStyles.icon} ${iconStyles.solid} fas fa-certificate`} />
              <span>Education</span>
            </Link>
            <Link
              to="/about"
              className={location.pathname === '/about' ? styles.active : ''}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faPortrait} className={`${iconStyles.icon} ${iconStyles.solid}`} />
              <span>About</span>
            </Link>
            <a
              href="https://linkedin.com/in/josefpedro/"
              target="_blank"
              rel="noreferrer"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={['fab', 'linkedin']} className={`${iconStyles.icon} ${iconStyles.brands} fab fa-linkedin`} />
              <span>LinkedIn</span>
            </a>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />

            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
