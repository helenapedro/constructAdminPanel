import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ProjectEditButtons = ({ editable, handleSave, handleCancel, handleEditToggle }) => {
     return (
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
     );
};

ProjectEditButtons.propTypes = {
     editable: PropTypes.bool.isRequired,
     handleSave: PropTypes.func.isRequired,
     handleCancel: PropTypes.func.isRequired,
     handleEditToggle: PropTypes.func.isRequired,
};

export default ProjectEditButtons;