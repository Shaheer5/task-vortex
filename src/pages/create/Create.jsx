import React, { useState } from 'react';

// styles
import './Create.css';

export default function Create() {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, details, dueDate)
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
          {/* category select here */}
        </label>
        <label htmlFor="">
          <span>Assign to:</span>
          {/* assignee select here */}
        </label>

        <button type="submit" className='btn btn-primary'>Add Project</button>
      </form>
    </div>
  )
}
