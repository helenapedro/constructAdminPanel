import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Form, Button } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProjectDetails, updateProjectDetails, fetchAllCategories } from '../../api';
import { wrapProjectFields } from '../../utils/wrapProjectFields';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import ProjectHeader from './ProjectHeader';
import ProjectActivities from './ProjectActivities';
import ProjectImages from './ProjectImages';
import styles from '../../pages/projects/Project.module.css';
import ProjectEditButtons from './ProjectEditButtons';
import numberstyles from '../../components/ui/Number.module.css';
import imagestyles from '../../components/ui/Image.module.css';
import containerstyles from '../../components/ui/Container.module.css';
import cardstyles from '../../components/ui/card.module.css';

const ProjectDetails = ({ projectId }) => {
     const queryClient = useQueryClient();
     const { data: project, isLoading, error } = useQuery(['project', projectId], () => fetchProjectDetails(projectId));
     const { data: categories } = useQuery('allCategories', fetchAllCategories);
     const mutation = useMutation((updatedData) => updateProjectDetails(projectId, updatedData), {
          onSuccess: () => {
               queryClient.invalidateQueries(['project', projectId]);
          },
     });

     const [editable, setEditable] = useState(false);
     const [formData, setFormData] = useState({});

     useEffect(() => {
          if (project) {
               setFormData({
                    ...project,
                    activities: project.activities || [],
               });
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

     const handleCategoryChange = (e) => {
          const selectedCategory = categories.find(category => category.name === e.target.value);
          setFormData({
               ...formData,
               categoryId: selectedCategory.id,
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

     const handleImageUpload = (e) => {
          const file = e.target.files[0];
          if (file) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    setFormData({
                         ...formData,
                         images: [...formData.images, reader.result],
                    });
               };
               reader.readAsDataURL(file);
          }
     };

     const handleImageDelete = (index) => {
          const updatedImages = formData.images.filter((_, i) => i !== index);
          setFormData({
               ...formData,
               images: updatedImages,
          });
     };

     const handleActivityChange = (index, field, value) => {
          const updatedActivities = [...formData.activities];
          updatedActivities[index][field] = value;
          setFormData({
               ...formData,
               activities: updatedActivities,
          });
     };

     const handleActivityItemChange = (activityIndex, itemIndex, value) => {
          const updatedActivities = [...formData.activities];
          updatedActivities[activityIndex].items[itemIndex] = value;
          setFormData({
               ...formData,
               activities: updatedActivities,
          });
     };

     const addActivityItem = (activityIndex) => {
          const updatedActivities = [...formData.activities];
          updatedActivities[activityIndex].items.push('');
          setFormData({
               ...formData,
               activities: updatedActivities,
          });
     };

     const removeActivityItem = (activityIndex, itemIndex) => {
          const updatedActivities = [...formData.activities];
          updatedActivities[activityIndex].items.splice(itemIndex, 1);
          setFormData({
               ...formData,
               activities: updatedActivities,
          });
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
                         <Form.Group controlId="formSummaryHeader">
                              <Form.Label>Summary Header</Form.Label>
                              {editable ? (
                                   <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="summaryHeader"
                                        value={formData.summaryHeader}
                                        onChange={handleChange}
                                   />
                              ) : (
                                   <p className={`${styles.projectdescription} number`}>
                                        <b>{wrappedProject.summaryHeader}</b>
                                   </p>
                              )}
                         </Form.Group>
                         <ProjectActivities
                              project={project}
                              wrapNumbersWithClass={wrapNumbersWithClass}
                              editable={editable}
                              formData={formData}
                              handleActivityChange={handleActivityChange}
                              handleActivityItemChange={handleActivityItemChange}
                              addActivityItem={addActivityItem}
                              removeActivityItem={removeActivityItem}
                         />
                         <Form.Group controlId="formProjectOutcome">
                              <Form.Label>Project Outcome</Form.Label>
                              {editable ? (
                                   <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="projectOutcome"
                                        value={formData.projectOutcome}
                                        onChange={handleChange}
                                   />
                              ) : (
                                   <p className={styles.projectdescription}>
                                        <b>{wrappedProject.projectOutcome}</b>
                                   </p>
                              )}
                         </Form.Group>
                         <ProjectImages
                              project={project}
                              handleImageClick={handleImageClick}
                              resolveUrl={resolveUrl}
                              editable={editable}
                              handleImageUpload={handleImageUpload}
                              handleImageDelete={handleImageDelete}
                         />
                         {editable && (
                              <>
                                   <Form.Group controlId="formOrganization">
                                        <Form.Label>Organization</Form.Label>
                                        <Form.Control
                                             type="text"
                                             name="organization"
                                             value={formData.organization}
                                             onChange={handleChange}
                                        />
                                   </Form.Group>
                                   <Form.Group controlId="formStartYear">
                                        <Form.Label>Start Year</Form.Label>
                                        <Form.Control
                                             type="number"
                                             name="startYear"
                                             value={formData.startYear}
                                             onChange={handleChange}
                                        />
                                   </Form.Group>
                                   <Form.Group controlId="formEndYear">
                                        <Form.Label>End Year</Form.Label>
                                        <Form.Control
                                             type="number"
                                             name="endYear"
                                             value={formData.endYear}
                                             onChange={handleChange}
                                        />
                                   </Form.Group>
                                   <Form.Group controlId="formProjectPlace">
                                        <Form.Label>Project Place</Form.Label>
                                        <Form.Control
                                             type="text"
                                             name="projectPlace.address"
                                             value={formData.projectPlace.address}
                                             onChange={handleChange}
                                        />
                                        <Form.Control
                                             type="text"
                                             name="projectPlace.country"
                                             value={formData.projectPlace.country}
                                             onChange={handleChange}
                                        />
                                   </Form.Group>
                                   <Form.Group controlId="formCategory">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                             as="select"
                                             value={categories.find(category => category.id === formData.categoryId)?.name || ''}
                                             onChange={handleCategoryChange}
                                        >
                                             {categories.map(category => (
                                                  <option key={category.id} value={category.name}>
                                                       {category.name}
                                                  </option>
                                             ))}
                                        </Form.Control>
                                   </Form.Group>
                                   <Form.Group controlId="formIsDeleted">
                                        <Form.Check
                                             type="checkbox"
                                             label="Is Deleted"
                                             name="isDeleted"
                                             checked={formData.isDeleted}
                                             onChange={(e) => setFormData({ ...formData, isDeleted: e.target.checked })}
                                        />
                                   </Form.Group>
                              </>
                         )}
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