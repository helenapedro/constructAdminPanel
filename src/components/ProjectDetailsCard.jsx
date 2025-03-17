import React from 'react';
import { useParams } from 'react-router-dom';
import useData from '../Hooks/useData';
import LoadingError from './comon/LoadingError';
import styles from '../pages/projects/Project.module.css';
import ProjectDetails from './Project/ProjectDetails';

const ProjectDetailsCard = () => {
  const { id } = useParams();
  const { data, loading, error } = useData('projects', id);

  return (
    <div className={`${styles.project} ${styles.panel}`}>
      <LoadingError loading={loading} error={error} />
      {!loading && !error && data && (
        <ProjectDetails
          projectId={id}
          title={data.title}
          organization={data.organization}
          endYear={data.endYear}
          projectPlace={data.projectPlace}
          summaryHeader={data.summaryHeader}
          activities={data.activities}
          projectOutcome={data.projectOutcome}
          images={data.images}
        />
      )}
    </div>
  );
};

export default ProjectDetailsCard;