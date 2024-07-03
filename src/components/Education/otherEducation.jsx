import React from 'react';
import styles from './Academic.module.css';
import config from '../../config';

const OtherEducationData = ({ otherEducationData }) => {
    if (!otherEducationData || !Array.isArray(otherEducationData)) {
        return <div>No data available.</div>;
    }

    return (
        <div className={styles.certificate}>
            {otherEducationData.map((data, index) => (
                <article className={styles.panel} key={index}>
                    <div className={styles.row}>
                        {data.images && data.images.length > 0 ? (
                            data.images.map((image, imgIndex) => {
                                const imageUrl = `${config.trainingUrl}${image}`;
                                return (
                                    <div className={`${styles['col-4']} ${styles['col-6-medium']} ${styles['col-12-small']}`} key={imgIndex}>
                                        <a className={styles.image}>
                                            <img src={imageUrl} alt={`Certificate ${index + 1}`} />
                                        </a>
                                        <p className={styles.title}>{data.title[imgIndex]}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={`${styles['col-12-small']}`}>
                                <p className={styles.title}>{data.title}</p>
                                <p>No image available</p>
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
};

export default OtherEducationData;
