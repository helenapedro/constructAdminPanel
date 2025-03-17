import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../pages/projects/Project.module.css';

const ProjectActivities = ({ project, wrapNumbersWithClass }) => {
     return (
          <>
               {Array.isArray(project.activities) && project.activities.length > 0 && (
                    project.activities.map((activitySection, sectionIndex) => (
                         <div key={sectionIndex}>
                              {typeof activitySection === 'string' ? (
                                   <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
                                        <li className={styles.projectActivityItem}>
                                             {wrapNumbersWithClass(activitySection, 'number')}
                                        </li>
                                   </ul>
                              ) : (
                                   <div>
                                        {activitySection.header && <h3>{activitySection.header}</h3>}
                                        {Array.isArray(activitySection.items) && activitySection.items.length > 0 && (
                                             <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
                                                  {activitySection.items.map((item, itemIndex) => (
                                                       <li className={styles.projectActivityItem} key={itemIndex}>
                                                            {wrapNumbersWithClass(item, styles.number)}
                                                       </li>
                                                  ))}
                                             </ul>
                                        )}
                                   </div>
                              )}
                         </div>
                    ))
               )}
          </>
     );
};

ProjectActivities.propTypes = {
     project: PropTypes.object.isRequired,
     wrapNumbersWithClass: PropTypes.func.isRequired,
};

export default ProjectActivities;