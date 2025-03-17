import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Col, Modal, CardHeader, Form } from 'react-bootstrap';
import * as iconsfa from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProjectDetails, updateProjectDetails } from '../../api';
import { wrapProjectFields } from '../../utils/wrapProjectFields';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import styles from '../../pages/projects/Project.module.css';
import numberstyles from '../../components/ui/Number.module.css';
import imagestyles from '../../components/ui/Image.module.css';
import prodetailsstyles from '../../components/ui/ProjectDetails.module.css';
import containerstyles from '../../components/ui/Container.module.css';
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

     const handleEditToggle = () => {
          setEditable(!editable);
          setFormData(project);
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
                         <CardHeader className={` ${cardstyles.cardHeader} text-center`}>
                              <h2 className={prodetailsstyles.title} id={`project-title-${project.title}`}>
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
                                                  project.organization
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
                                                  `${project.projectPlace?.address}, ${project.projectPlace?.province}, ${project.projectPlace?.country}`
                                             )}
                                        </b>
                                   </div>
                              </Card.Subtitle>
                         </CardHeader>
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
                         {Array.isArray(project.images) && project.images.length > 0 && (
                              <section aria-label="Project images">
                                   <div className={imagestyles.row}>
                                        {project.images.map((image, imgIndex) => {
                                             const imageUrl = resolveUrl(image);
                                             return (
                                                  <div className={imagestyles.imageContainer} key={imgIndex}>
                                                       <button
                                                            className={imagestyles.imageButton}
                                                            onClick={() => handleImageClick(imageUrl)}
                                                       >
                                                            <img src={imageUrl} alt={`Project ${imgIndex}`} className={imagestyles.image} />
                                                       </button>
                                                  </div>
                                             );
                                        })}
                                   </div>
                              </section>
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

               <div className="d-flex justify-content-end mt-3">
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
          </div>
     );
};

ProjectDetails.propTypes = {
     projectId: PropTypes.string.isRequired,
};

export default ProjectDetails;