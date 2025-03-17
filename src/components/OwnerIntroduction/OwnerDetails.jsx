import React from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import herostyles from '../../components/ui/Hero.module.css';

const OwnerDetails = ({ formData, editable, handleChange, handleSave, handleCancel, handleEditToggle }) => {
     return (
          <Col md={8} className={`${herostyles.text}`}>
               <Card.Text>
                    <strong>Hello, my name is </strong>
                    {editable ? (
                         <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`${herostyles.name}`}
                         />
                    ) : (
                         <Link to="/about" className={`${herostyles.name}`}>
                              {formData.name}
                         </Link>
                    )}
                    , an experienced Construction Engineer with over{' '}
                    <strong className={`${herostyles.experienceYear} ${herostyles.colorTwo}`}>
                         {editable ? (
                              <Form.Control
                                   type="number"
                                   name="experienceYears"
                                   value={formData.experienceYears}
                                   onChange={handleChange}
                              />
                         ) : (
                              formData.experienceYears
                         )}
                    </strong> years in project management and{' '}
                    <strong className={`${herostyles.experienceYear} ${herostyles.colorTwo}`}>
                         {editable ? (
                              <Form.Control
                                   type="number"
                                   name="qhseExperienceYears"
                                   value={formData.qhseExperienceYears}
                                   onChange={handleChange}
                              />
                         ) : (
                              formData.qhseExperienceYears
                         )}
                         +
                    </strong> year as Coordinator of QHSE-Quality at{' '}
                    {editable ? (
                         <Form.Control
                              type="text"
                              name="motaEngilLink"
                              value={formData.motaEngilLink}
                              onChange={handleChange}
                              className={herostyles.colorTwo}
                         />
                    ) : (
                         <Link to={formData.motaEngilLink} target="_blank" rel="noopener noreferrer" className={herostyles.colorTwo}>
                              Mota-Engil Angola
                         </Link>
                    )}
                    .
               </Card.Text>

               {editable && (
                    <Card.Text className="mb-2">
                         <Form.Control
                              as="textarea"
                              name="experienceDescription"
                              value={formData.experienceDescription}
                              onChange={handleChange}
                         />
                    </Card.Text>
               )}

               <Card.Text className="mb-2">
                    {editable ? (
                         <Form.Control
                              as="textarea"
                              name="showcaseDescription"
                              value={formData.showcaseDescription}
                              onChange={handleChange}
                         />
                    ) : (
                         formData.showcaseDescription
                    )}
               </Card.Text>

               <Card.Text className="mb-2">
                    {editable ? (
                         <Form.Control
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                         />
                    ) : (
                         formData.title
                    )}
               </Card.Text>

               <div className="d-flex justify-content-end">
                    {editable ? (
                         <>
                              <Button variant="primary" onClick={handleSave}>
                                   Save
                              </Button>
                              <Button variant="secondary" onClick={handleCancel} className="ms-2">
                                   Cancel
                              </Button>
                         </>
                    ) : (
                         <Button variant="secondary" onClick={handleEditToggle}>
                              Edit
                         </Button>
                    )}
               </div>
          </Col>
     );
};

export default OwnerDetails;