import React from 'react';
import { Col, Form, Card } from 'react-bootstrap';
import imagestyles from '../../components/ui/Image.module.css';
import herostyles from '../../components/ui/Hero.module.css';

const OwnerImage = ({ formData, editable, handleChange }) => {
     return (
          <Col md={4} className="text-center">
               {formData.mainImage && (
                    <img
                         src={formData.mainImage}
                         alt={formData.name}
                         className={`${imagestyles.heroImage}`}
                    />
               )}
               <Card.Title as="h2" className={`${herostyles.fullName} fw-bold`}>
                    {editable ? (
                         <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                         />
                    ) : (
                         formData.name
                    )}
               </Card.Title>
          </Col>
     );
};

export default OwnerImage;