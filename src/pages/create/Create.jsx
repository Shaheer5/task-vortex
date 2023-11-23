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
    e.preventDefault()

    console.log(name, details, dueDate)
  }

  return (
    <div>Create</div>
  )
}
