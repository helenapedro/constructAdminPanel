import React from 'react';
import PropTypes from 'prop-types';
import imagestyles from '../../components/ui/Image.module.css';

const ProjectImages = ({ project, handleImageClick, resolveUrl }) => {
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
                                        </div>
                                   );
                              })}
                         </div>
                    </section>
               )}
          </>
     );
};

ProjectImages.propTypes = {
     project: PropTypes.object.isRequired,
     handleImageClick: PropTypes.func.isRequired,
     resolveUrl: PropTypes.func.isRequired,
};

export default ProjectImages;