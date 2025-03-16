import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import SkillsHeader from "./SkillsHeader";
import SkillsBody from "./SkillsBody";
import styles from './Skills.module.css';
import { wrapSkillsField } from "../../utils/wrapSkills";

const SkillsTable = () => {
  const [sortColumn, setSortColumn] = useState({ path: 'year', order: 'desc' });
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillsFromFirebase = async () => {
      try {
        const skillsCollection = collection(db, "skills");
        const skillsSnapshot = await getDocs(skillsCollection);
        if (skillsSnapshot.empty) {
          setSkills([]);
        } else {
          const skillsList = skillsSnapshot.docs.map(doc => doc.data());
          setSkills(skillsList);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSkillsFromFirebase();
  }, []);

  const handleSort = (newSortColumn) => {
    setSortColumn(newSortColumn);
    const sortedSkills = [...skills].sort((a, b) => {
      const path = newSortColumn.path;
      const order = newSortColumn.order === "asc" ? 1 : -1;
      if (a[path] < b[path]) return -1 * order;
      if (a[path] > b[path]) return 1 * order;
      return 0;
    });
    setSkills(sortedSkills);
  };

  // Wrap skills with the class for styling
  const wrappedSkills = wrapSkillsField(skills, styles.number);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <header className={styles['skills-table']}>
        <section className={styles.panel}>
          <div className={`${styles['skills-table-body']} table-responsive mb-3`}>
            <table className="table table-bordered table-hover border-primary">
              <SkillsHeader sortColumn={sortColumn} onSort={handleSort} />
              <SkillsBody data={wrappedSkills} />
            </table>
          </div>
        </section>
      </header>
    </div>
  );
};

export default SkillsTable;