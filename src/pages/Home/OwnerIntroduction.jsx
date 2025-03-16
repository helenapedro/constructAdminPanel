import React, { useState, useEffect } from 'react';
import config from '../../config';
import StatusBadge from './StatusBadge';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { SiWhatsapp } from 'react-icons/si';
import herostyles from '../../components/ui/Hero.module.css';
import imagestyles from '../../components/ui/Image.module.css';
import containerstyles from '../../components/ui/Container.module.css';
import { db, doc, getDoc, updateDoc } from '../../firebase';
import OwnerData from '../../types/index';

const OwnerIntroduction = ({ ownerData }) => {
    const documentId = 'homeInfo';
    const [formData, setFormData] = useState(OwnerData);
    const [originalData, setOriginalData] = useState(OwnerData);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const docRef = doc(db, 'home', documentId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = { id: documentId, ...docSnap.data() }; // Add the ID to the data
                    setFormData(data);
                    setOriginalData(data);
                    console.log('Owner Data Fetched:', data);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching owner data:', error);
            }
        };

        fetchOwnerData();
    }, [documentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditToggle = () => {
        setEditable(!editable);
        setOriginalData(formData); // Save the original data
    };

    const handleSave = async () => {
        try {
            const docRef = doc(db, 'home', documentId);
            await updateDoc(docRef, {
                mainImage: formData.mainImage,
                name: formData.name,
                experienceDescription: formData.experienceDescription,
                experienceYears: formData.experienceYears,
                qhseExperienceYears: formData.qhseExperienceYears,
                motaEngilLink: formData.motaEngilLink,
                oeaCardLink: formData.oeaCardLink,
                showcaseDescription: formData.showcaseDescription,
                title: formData.title,
            });
            setEditable(false);
            console.log('Document successfully updated');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleCancel = () => {
        setFormData(originalData);
        setEditable(false);
    };

    return (
        <Card className={`${containerstyles.container} mb-4`}>
            <Card.Body className={` p-4`}>
                <Row className="align-items-center">
                    {/* Profile Image */}
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
                        <div className="d-flex justify-content-center justify-content-md-center gap-2 overflow-auto">
                            <StatusBadge Icon={FaEnvelope} href={`mailto:jose.pedro7@outlook.com`} />
                            <StatusBadge Icon={SiWhatsapp} href={`https://wa.me/+244947462094`} />
                            <StatusBadge Icon={FaFileAlt} href={config.resumeUrl} />
                        </div>
                    </Col>

                    {/* Owner Details */}
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

                        <Card.Text className="mb-2">
                            This is a showcase of my projects and abilities.
                        </Card.Text>

                        <div className="d-flex justify-content-end">
                            {editable ? (
                                <Button variant="primary" onClick={handleSave}>
                                    Save
                                </Button>
                            ) : (
                                <Button variant="secondary" onClick={handleEditToggle}>
                                    Edit
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OwnerIntroduction;
