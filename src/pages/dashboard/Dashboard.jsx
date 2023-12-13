import React, { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import './Dashboard.css';

export default function Dashboard() {
  const { documents, error } = useCollection('projects');
  const [filter, setFilter] = useState('all');

  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  }

  const projects = documents ? documents.filter((document) => {
    switch (filter) {
      case 'all':
        return true;
      case 'mine': {
        let assignedToMe = false;
        document.assignedUsersList.forEach(u => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        })
        return assignedToMe;
      }
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category, filter)
        return document.category === filter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && (<p className='error'>{error}</p>)}
      {documents && (
        <ProjectFilter changeFilter={changeFilter} filter={filter} />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}
