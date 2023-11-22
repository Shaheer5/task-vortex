import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSignup } from '../../hooks/useSignup';
import { Link } from 'react-router-dom';

// Import the CSS file for styles
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsConfirmed(password === confirmPassword);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setIsConfirmed(password === e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!displayName || !email || !password || !confirmPassword) {
      toast.error("Please fill out each input field", { autoClose: 2000 });
      return;
    } else if (!isConfirmed) {
      toast.warning("Passwords do not match. Please confirm your password.", { autoClose: 2000 });
      return;
    } else if (isConfirmed) {
      signup(email, password, displayName, thumbnail);
      return;
    }
    console.log(error);
  };


  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select an image");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    toast.success("Thumbnail Updated", {autoClose: 2000});
  }


  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Signup</h2>
      <label>
        <span>Username:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          placeholder='freshfries01'
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='name@email.com'
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder='*********'
          className={isConfirmed ? 'valid-input' : 'invalid-input'}
        />
      </label>
      <label>
        <span>Confirm Password:</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          placeholder='*********'
          className={isConfirmed ? 'valid-input' : 'invalid-input'}
        />
        {isConfirmed ? (
          <p>Password Matched</p>
        ) : (
          <></>
        )}
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input
          required
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {/* <button className="btn">Signup</button> */}
      {!isPending && <button className="btn btn-primary">Signup</button>}
      {isPending && <button className='btn btn-secondary' disabled>loading</button>}
      <Link
        to={'/login'}
        style={{ color: "blue", fontSize: "14px", textAlign: "end" }}
      ><span>login instead</span></Link>
    </form>
  );
}
