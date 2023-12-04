import React from 'react';
import Avatar from '../../components/Avatar';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ProjectSummary = ({ project }) => {

  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore('projects');
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteDocument(project.id);
    navigate('/')
  }
  return (
    <div className='project-summary'>
      <h2>{project.name}</h2>
      <em>by {project.createdBy.displayName}</em>
      <p className='due-date'>{project.dueDate.toDate().toDateString()}</p>
      <p className='details'>{project.details}</p>
      <h4>category: {project.category}</h4>

      <div className="assigned-users">
        <em>Assigned to:</em>
        {project.assignedUsersList.map(user => (
          <div key={user.id} className='user'>
            {/* <Avatar src={user.photoURL} /> */}
            <p>{user.displayName}</p>
          </div>
        ))}
      </div>
      <br />
      {user.uid === project.createdBy.id && 
        <button className='btn' onClick={handleDelete}>mark as complete</button>}
    </div>
  )
}
