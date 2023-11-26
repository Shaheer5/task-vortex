import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Create.css';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]


// Main Function
export default function Create() {

  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    if(documents) {
      const options = documents.map((user) => {
        return { value: {...user, id: user.id}, label: user.displayName }
      })
      setUsers(options);
    }
    
    return () => {
      
    }
  }, [documents])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if(!category) {
      setFormError('Select category');
      return
    }
    if(assignedUsers.length < 1) {
      setFormError('Assign to at least 1 user');
      return
    }

    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photo: u.value.photoURL,
        id: u.value.id,
      }
    })

    const createdBy = {
      displayName: user.displayName,
      photo: user.photoURL,
      id: user.uid,
    }
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    }
    toast.success('Project Added', {autoClose: 2000})
    console.log(project)
  };

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={e => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <input
            required
            type="date"
            onChange={e => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>

        <label htmlFor="">
          <span>Project Category:</span>
          <Select 
            onChange={option => setCategory(option)}
            options={categories}
          />
        </label>
        <label htmlFor="">
          <span>Assign to:</span>
          <Select 
            onChange={option => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button type="submit" className='btn btn-primary'>Add Project</button>
        {formError && <p className="error">{formError}</p>}

      </form>
    </div>
  )
}
