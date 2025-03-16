import React from 'react';
import config from '../../config';
import StatusBadge from './StatusBadge';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { SiWhatsapp } from 'react-icons/si';
import herostyles from '../../components/ui/Hero.module.css';
import imagestyles from '../../components/ui/Image.module.css';
import containerstyles from '../../components/ui/Container.module.css';

const OwnerIntroduction = ({ ownerData }) => {
    return (
        <Card className={`${containerstyles.container} mb-4`}>
            <Card.Body className={` p-4`}>
                <Row className="align-items-center">
                    {/* Profile Image */}
                    <Col md={4} className="text-center">
                        {ownerData.mainImage && (
                            <img
                                src={ownerData.mainImage}
                                alt={ownerData.name}
                                className={`${imagestyles.heroImage}`}
                            />
                        )}
                        <Card.Title as="h2" className={`${herostyles.fullName} fw-bold`}>
                            {ownerData.name}
                        </Card.Title>
                        {/* <p className="text-xl text-gray-200 mb-6">Construction Engineer</p> */}
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
                            <Link to="/about" className={`${herostyles.name}`}>
                                ZéPedro
                            </Link>
                            , an experienced Construction Engineer with over{' '}
                            <strong className={`${herostyles.experienceYear} ${herostyles.colorTwo}`}>{ownerData.experienceYears}</strong> years in project
                            management and {' '}
                            <strong className={`${herostyles.experienceYear} ${herostyles.colorTwo}`}>{ownerData.qhseExperienceYears}+</strong> year as Coordinator
                            of QHSE-Quality at{' '}
                            <Link to={ownerData.motaEngilLink} target="_blank" rel="noopener noreferrer" className={herostyles.colorTwo}>
                                Mota-Engil Angola
                            </Link>.
                        </Card.Text>

                        <Card.Text className="mb-2">
                            This is a showcase of my projects and abilities.
                        </Card.Text>

                        {/* Status Badge Icons */}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OwnerIntroduction;
