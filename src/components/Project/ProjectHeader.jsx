import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';
import * as iconsfa from 'react-icons/fa';
import prodetailsstyles from '../../components/ui/ProjectDetails.module.css';

const ProjectHeader = ({ editable, formData, handleChange, wrappedProject }) => {
     return (
          <Card.Header className={` ${prodetailsstyles.cardHeader} text-center`}>
               <h2 className={prodetailsstyles.title} id={`project-title-${formData.title}`}>
                    {editable ? (
                         <Form.Control
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                         />
                    ) : (
                         wrappedProject.title
                    )}
               </h2>
               <Card.Subtitle className={`${prodetailsstyles.subtitle}`}>
                    <div className={prodetailsstyles.organization}>
                         <span className={`${prodetailsstyles.orgTitle}`}>
                              {editable ? (
                                   <Form.Control
                                        type="text"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                   />
                              ) : (
                                   formData.organization
                              )}
                         </span>
                    </div>
                    <div className={`${prodetailsstyles.place}`}>
                         <iconsfa.FaMapMarkerAlt className={prodetailsstyles.icon} />
                         <b>
                              {editable ? (
                                   <Form.Control
                                        type="text"
                                        name="projectPlace"
                                        value={formData.projectPlace?.address}
                                        onChange={handleChange}
                                   />
                              ) : (
                                   `${formData.projectPlace?.address}, ${formData.projectPlace?.province}, ${formData.projectPlace?.country}`
                              )}
                         </b>
                    </div>
               </Card.Subtitle>
          </Card.Header>
     );
};

ProjectHeader.propTypes = {
     editable: PropTypes.bool.isRequired,
     formData: PropTypes.object.isRequired,
     handleChange: PropTypes.func.isRequired,
     wrappedProject: PropTypes.object.isRequired,
};

export default ProjectHeader;