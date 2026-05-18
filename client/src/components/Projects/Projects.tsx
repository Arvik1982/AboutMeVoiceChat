import React from "react";
import styles from "./Projects.module.css";
import type { Project } from "../../types";

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className={styles.section}>
      <h2>Ключевые проекты</h2>
      <div className={styles.projects}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                View Demo →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
