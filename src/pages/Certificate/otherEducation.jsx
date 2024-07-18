import React from 'react';
import styles from './Academic.module.css';
import config from '../../config';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';

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
                                    <div className='col-4 col-6-medium col-12-small' key={imgIndex}>
                                        <div className={styles.image}>
                                            <img src={imageUrl} alt={`Certificate ${index + 1}`} />
                                        </div>
                                        <h4 className={styles.title}>{wrapNumbersWithClass(data.title[imgIndex], styles.number)}</h4>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='col-12-small'>
                                <p className={styles.title}>{data.title}</p>
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
};

export default OtherEducationData;
