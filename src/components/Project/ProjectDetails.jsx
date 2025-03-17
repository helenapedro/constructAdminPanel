import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Form, Button } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProjectDetails, updateProjectDetails } from '../../api';
import { wrapProjectFields } from '../../utils/wrapProjectFields';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import ProjectHeader from './ProjectHeader';
import ProjectActivities from './ProjectActivities';
import ProjectImages from './ProjectImages';
import ProjectEditButtons from './ProjectEditButtons';
import numberstyles from '../../components/ui/Number.module.css';
import imagestyles from '../../components/ui/Image.module.css';
import containerstyles from '../../components/ui/Container.module.css';
import styles from '../../pages/projects/Project.module.css';
import cardstyles from '../../components/ui/card.module.css';

const ProjectDetails = ({ projectId }) => {
     const queryClient = useQueryClient();
     const { data: project, isLoading, error } = useQuery(['project', projectId], () => fetchProjectDetails(projectId));
     const mutation = useMutation((updatedData) => updateProjectDetails(projectId, updatedData), {
          onSuccess: () => {
               queryClient.invalidateQueries(['project', projectId]);
          },
     });

     const [editable, setEditable] = useState(false);
     const [formData, setFormData] = useState({});

     useEffect(() => {
          if (project) {
               setFormData(project);
          }
     }, [project]);

     const handleEditToggle = () => {
          setEditable(!editable);
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });
     };

     const handleSave = () => {
          mutation.mutate(formData);
          setEditable(false);
     };

     const handleCancel = () => {
          setEditable(false);
          setFormData(project);
     };

     const [showModal, setShowModal] = useState(false);
     const [currentImage, setCurrentImage] = useState('');

     const handleImageClick = (imageUrl) => {
          setCurrentImage(imageUrl);
          setShowModal(true);
     };

     const handleCloseModal = () => {
          setShowModal(false);
          setCurrentImage('');
     };

     const resolveUrl = (url) => {
          const baseUrl = 'https://dh09x5tu10bt3.cloudfront.net/';
          return url.startsWith('http') ? url : `${baseUrl}${url}`;
     };

     if (isLoading) return <p>Loading...</p>;
     if (error) return <p>Error: {error.message}</p>;

     const wrappedProject = wrapProjectFields({
          title: project.title,
          endYear: project.endYear,
          summaryHeader: project.summaryHeader,
          activities: project.activities,
          projectOutcome: project.projectOutcome,
     }, numberstyles.proDetailsNumber);

     return (
          <div className={containerstyles.cardContainer}>
               <Col className={containerstyles.panel} aria-labelledby={`project-title-${project.title}`}>
                    <div className={`${cardstyles.cardContainer}`}>
                         <ProjectHeader
                              editable={editable}
                              formData={formData}
                              handleChange={handleChange}
                              wrappedProject={wrappedProject}
                         />
                         <p className={`${styles.projectdescription} number`}>
                              <b>
                                   {editable ? (
                                        <Form.Control
                                             type="text"
                                             name="summaryHeader"
                                             value={formData.summaryHeader}
                                             onChange={handleChange}
                                        />
                                   ) : (
                                        wrappedProject.summaryHeader
                                   )}
                              </b>
                         </p>
                         <ProjectActivities project={project} wrapNumbersWithClass={wrapNumbersWithClass} />
                         <p className={styles.projectdescription}>
                              <b>
                                   {editable ? (
                                        <Form.Control
                                             type="text"
                                             name="projectOutcome"
                                             value={formData.projectOutcome}
                                             onChange={handleChange}
                                        />
                                   ) : (
                                        wrappedProject.projectOutcome
                                   )}
                              </b>
                         </p>
                         <ProjectImages project={project} handleImageClick={handleImageClick} resolveUrl={resolveUrl} />
                    </div>
               </Col>

               {/* Modal for displaying images */}
               <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                         <Modal.Title>Image Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <img src={currentImage} alt="Project" className={imagestyles.modalImage} />
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleCloseModal}>
                              Close
                         </Button>
                    </Modal.Footer>
               </Modal>

               <ProjectEditButtons
                    editable={editable}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    handleEditToggle={handleEditToggle}
               />
          </div>
     );
};

ProjectDetails.propTypes = {
     projectId: PropTypes.string.isRequired,
};

export default ProjectDetails;