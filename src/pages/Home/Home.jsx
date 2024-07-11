import React from 'react';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Home.module.css';
import iconStyles from '../../styles/Icons.module.css'
import mainStyles from '../../components/Main.module.css'; 

const Home = () => {
  return (
    <article id='home' className={`${mainStyles.panel} ${mainStyles.intro}`}>
          <header>
            <h1 className={`card-title ${styles['home-title']}`}>José Francisco Pedro</h1>
            <p className={`card-text ${styles['home-text']}`}>
              <b> Hello, my name is <Link to="/card">ZéPedro</Link> and I'm an experienced Civil Engineer,
              with over <i>3</i> years in
              project management and nearly <i>1</i> year
              as Coordinator of QHSE-Quality at <Link to='https://www.linkedin.com/company/mota-engil-angola/' target='_blank' rel='noopener noreferrer'>Mota-Engil Angola</Link>.</b>
            </p>
            <p className={`card-text ${styles['home-text']}`}>
              <b>This is a showcase of my 
              <Link to="/projects" className='fst-italic'>projects</Link> and <Link to="/certificate" className='fst-italic'>abilities</Link>.</b>
            </p>
          </header>
          <Link to="/projects" className={`jumplink ${mainStyles.pic} ${styles.link}`}>
            <span className={`${iconStyles.icon} ${iconStyles.solid} ${faChevronRight} fa-chevron-right arrow`}>See my work</span>
            <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/me_1.jpg" alt="José Francisco Pedro" />
          </Link>
    </article>
  );
}

export default Home;
