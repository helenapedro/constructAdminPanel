import React, { useEffect, useState } from 'react';
import Project from './Project';
import PaginationComponent from '../../utils/PaginationComponent';
import styles from './Project.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 3;

  const dataUrl = process.env.REACT_APP_PROJECTS_DATA_URL;

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched projects data:', data); 
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects data:', error);
        setLoading(false);
      });
  }, [dataUrl]);  

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="main" className={styles.projectContainer}>
      <div>
        {paginatedProjects.map((project, index) => (
          <React.Fragment key={index}>
            <Project
              title={project.title}
              organization={project.organization}
              placeandyear={project.placeandyear}
              description={project.description}
              activities={project.activities}
              finalDescription={project.finalDescription}
              images={project.images}
            />
            {index !== paginatedProjects.length - 1 && <br />}
          </React.Fragment>
        ))}
        <PaginationComponent
          itemsCount={projects.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Projects;
