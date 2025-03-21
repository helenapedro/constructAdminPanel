import React from 'react';
import styles from './Wrapper.module.css';

const Wrapper = ({ children }) => {
    return <div className={`${styles['is-preload']} ${styles.wrapper}`}>{children}</div>;
};

export default Wrapper;
