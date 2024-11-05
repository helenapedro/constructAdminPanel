import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPortrait, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import styles from "./NavBar.module.css";
import iconStyles from '../../styles/Icons.module.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={menuOpen ? styles.active : ''} onClick={toggleMenu}></div>
      <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''} onClick={toggleMenu}>
          <FontAwesomeIcon icon="house" className={`${iconStyles.icon} ${iconStyles.solid} fas fa-house`} />
         <span>Home</span>
        </Link>  
        <Link to="/projects" className={location.pathname === '/projects' ? styles.active : ''} onClick={toggleMenu}>
          <FontAwesomeIcon icon="building" className={`${iconStyles.icon} ${iconStyles.solid} fas fa-building`} />
          <span>Projects</span>
        </Link>
        <Link to="/education" className={location.pathname === '/education' ? styles.active : ''} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faGraduationCap} className={`${iconStyles.icon} ${iconStyles.solid} fas fa-certificate`} />
          <span>Education</span>
        </Link>
        <Link to="/about" className={location.pathname === '/about' ? styles.active : ''} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faPortrait} className={`${iconStyles.icon} ${iconStyles.solid}`} />
          <span>About</span>
        </Link>
        <a 
          href="https://linkedin.com/in/josefpedro/" 
          target="_blank" 
          rel="noreferrer"
          onClick={toggleMenu}>
          <FontAwesomeIcon icon={['fab', 'linkedin']} className={`${iconStyles.icon} ${iconStyles.brands} fab fa-linkedin`} />
          <span>LinkedIn</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
