import React from 'react';
import Avatar from '../../components/Avatar';

export const ProjectSummary = ({ project }) => {
  return (
    <div className='project-summary'>
      <h2>{project.name}</h2>
      <span className='due-date'>{project.dueDate.toDate().toDateString()}</span>
      <p className='details'>{project.details}</p>
      <h4>{project.category}</h4>

      <div className="assigned-users">
        {project.assignedUsersList.map(user => (
          <div key={user.id}>
            <p>Assigned to:</p>
            <p className="details">{user.displayName}</p>
            <Avatar src={user.photoURL} />
          </div>
        ))}
      </div>

    </div>
  )
}
