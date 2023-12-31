import { useState } from 'react'
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom';

// styles
import './Login.css';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (!email && !password) {
      toast.error("Please Enter Credentials", { autoClose: 2000 });
      return;
    } else if (email === "") {
      toast.error("Please Enter Email", { autoClose: 2000 });
      return;
    } else if (password === "") {
      toast.error("Please Enter Password", { autoClose: 2000 });
      return;
    } else if (email && password) {
      login(email, password);
      return;
    } else {
      toast.error(error.message, { autoClose: 2000 });
      return;
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          <span>Email:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='name@email.com'
          />
          <em style={{fontSize: "14px"}}>use email: test@email.com</em>
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='*********'
          />
          <em style={{fontSize: "14px"}}>use password: 12345678</em>
        </label>
        {!isPending && <button className="btn btn-primary">Login</button>}
        {isPending && <button className='btn btn-secondary' disabled>loading</button>}
        <Link
          to={'/signup'}
          style={{ color: "blue", fontSize: "14px", textAlign: "end" }}
        ><span>create an account</span></Link>
      </form>
    </div>
  )
} 
