import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

import Certificate from '../Certificate/Certificate';

const Home = () => {
    return (
        <div className={styles.mainContainer}>
            <article className={`${styles.panel} ${styles.introPanel}`}>
                <header className={styles.header}>
                    <h1 className={styles.title}>José Francisco Pedro</h1>
                    <p className={styles.description}>
                        <strong>
                            Hello, my name is <Link to="/card">ZéPedro</Link> and I am an experienced <Link to="/certificate">Civil Engineer</Link>,
                            with over <i className={styles.year}>3</i> years in
                            project management and nearly <i className={styles.year}>1</i> year
                            as Coordinator of QHSE-Quality in Mota-Engil Angola. <br />
                        </strong>
                    </p>
                    <p className={styles.description}>
                        <strong>
                            Proficient in managing and executing <Link to="/projects">civil construction projects</Link>,
                            including roads, bridges, maritime, and airport pavements. <br />
                            Skilled in utilizing various <a href='/certificate'>engineering and project management software</a> to 
                            enhance project delivery and quality assurance.
                        </strong>
                    </p>
                </header>
                <Link to="/certificate#technical-skills" className={`${styles.jumplink} ${styles.projectLink}`}>
                    <span className={`${styles.arrow} fas fa-chevron-right`}></span>
                    <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/me_1.jpg" alt="José Francisco Pedro" className={styles.profileImage} />
                </Link>
            </article>
        </div>
    );
};

export default Home;
