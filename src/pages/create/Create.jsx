import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';

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

  useEffect(() => {
    if(documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options);
    }
    
    return () => {
      
    }
  }, [documents])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.success('Project Added', {autoClose: 2000})
    console.log(name, details, dueDate, category.value, assignedUsers)
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
      </form>
    </div>
  )
}
