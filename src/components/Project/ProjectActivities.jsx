import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import styles from '../../pages/projects/Project.module.css';

const ProjectActivities = ({
     project,
     wrapNumbersWithClass,
     editable,
     formData,
     handleActivityChange,
     handleActivityItemChange,
     addActivityItem,
     removeActivityItem,
}) => {
     return (
          <>
               {Array.isArray(formData.activities) && formData.activities.length > 0 && (
                    formData.activities.map((activitySection, sectionIndex) => (
                         <div key={sectionIndex}>
                              {editable ? (
                                   <>
                                        <Form.Group controlId={`formActivityHeader-${sectionIndex}`}>
                                             <Form.Label>Activity Header</Form.Label>
                                             <Form.Control
                                                  type="text"
                                                  name={`activities[${sectionIndex}].header`}
                                                  value={activitySection.header}
                                                  onChange={(e) => handleActivityChange(sectionIndex, 'header', e.target.value)}
                                             />
                                        </Form.Group>
                                        {activitySection.items.map((item, itemIndex) => (
                                             <Form.Group controlId={`formActivityItem-${sectionIndex}-${itemIndex}`} key={itemIndex}>
                                                  <Form.Label>Activity Item</Form.Label>
                                                  <Form.Control
                                                       type="text"
                                                       name={`activities[${sectionIndex}].items[${itemIndex}]`}
                                                       value={item}
                                                       onChange={(e) => handleActivityItemChange(sectionIndex, itemIndex, e.target.value)}
                                                  />
                                                  <Button variant="danger" onClick={() => removeActivityItem(sectionIndex, itemIndex)}>
                                                       Remove Item
                                                  </Button>
                                             </Form.Group>
                                        ))}
                                        <Button variant="primary" onClick={() => addActivityItem(sectionIndex)}>
                                             Add Item
                                        </Button>
                                   </>
                              ) : (
                                   <>
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
                                   </>
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
     editable: PropTypes.bool.isRequired,
     formData: PropTypes.object.isRequired,
     handleActivityChange: PropTypes.func.isRequired,
     handleActivityItemChange: PropTypes.func.isRequired,
     addActivityItem: PropTypes.func.isRequired,
     removeActivityItem: PropTypes.func.isRequired,
};

export default ProjectActivities;