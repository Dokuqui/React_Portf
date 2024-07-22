import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ProjectCard = ({ title, description, link }) => {
  return (
    <Card className="project-card">
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={link}
          style={{ marginTop: '10px' }}
        >
          View Project
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
