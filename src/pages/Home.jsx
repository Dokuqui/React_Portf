import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  const projects = [
    {
      title: 'Product Grid',
      description: 'A product management grid with CRUD operations.',
      link: '/product-grid'
    }
    // Add more projects here
  ];

  return (
    <main>
      <section id="projects">
        <h2>Projects</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
