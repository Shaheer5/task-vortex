import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './ProjectList.css';

export default function ProjectList({ projects }) {
  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No Projects yet!</p>}

      {projects.map(project => (
        <Link to={`/project/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>

          <div className="assigned-to">
            <div className="users-list">
              <p>Assigned to:</p>
              {project.assignedUsersList.map((user) => (
                <div key={user.id} className='user'>
                  {/* <Avatar src={user.photoURL} /> */}
                  <p className='username' style={{marginLeft: "4px"}}>{user.displayName}</p>
                </div>
              ))}
            </div>
          </div>

        </Link>
      ))}
    </div>
  );
}
