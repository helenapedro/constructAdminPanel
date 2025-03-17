import React, { useState, useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import { db, doc, getDoc, updateDoc } from '../../firebase';
import OwnerData from '../../types/index';
import OwnerDetails from '../../components/OwnerIntroduction/OwnerDetails';
import OwnerImage from '../../components/OwnerIntroduction/OwnerImage';
import StatusBadges from '../../components/OwnerIntroduction/StatusBadges';
import containerstyles from '../../components/ui/Container.module.css';

const OwnerIntroduction = () => {
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
                    //console.log('Owner Data Fetched:', data);
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
                    <OwnerImage formData={formData} editable={editable} handleChange={handleChange} />

                    {/* Status Badges */}
                    <StatusBadges />

                    {/* Owner Details */}
                    <OwnerDetails
                        formData={formData}
                        editable={editable}
                        handleChange={handleChange}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                        handleEditToggle={handleEditToggle}
                    />
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OwnerIntroduction;