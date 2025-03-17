import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import imagestyles from '../../components/ui/Image.module.css';

const ProjectImages = ({ project, handleImageClick, resolveUrl, editable, handleImageUpload, handleImageDelete }) => {
     return (
          <>
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
                                             {editable && (
                                                  <Button variant="danger" onClick={() => handleImageDelete(imgIndex)}>
                                                       Delete
                                                  </Button>
                                             )}
                                        </div>
                                   );
                              })}
                         </div>
                    </section>
               )}
               {editable && (
                    <Form.Group controlId="formImageUpload">
                         <Form.Label>Upload New Image</Form.Label>
                         <Form.Control type="file" onChange={handleImageUpload} />
                    </Form.Group>
               )}
          </>
     );
};

ProjectImages.propTypes = {
     project: PropTypes.object.isRequired,
     handleImageClick: PropTypes.func.isRequired,
     resolveUrl: PropTypes.func.isRequired,
     editable: PropTypes.bool.isRequired,
     handleImageUpload: PropTypes.func.isRequired,
     handleImageDelete: PropTypes.func.isRequired,
};

export default ProjectImages;