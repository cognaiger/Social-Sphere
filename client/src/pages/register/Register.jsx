import "./register.scss"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();    

    try {
      const response = await axios.post("http://localhost:2504/auth/signup", {
        username: username,
        email: email,
        password: password,
        name: name
      });

      if (response.status === 201) {
        setMsg("Register successfully");
        navigate('/login');
      } else {
        setMsg("Register fail, please try again");
      } 
    } catch (err) {
      setMsg("Username has already existed");
    }
  }

  return (
      <div className="register">
        <div className="card">
          <div className="left">
            <h1>Lama Social.</h1>
            <p>
              Want to start a journey of making friends everywhere? Begin the first step by creating an 
              account
            </p>
            <span>Do you have an account?</span>
            <button>
              <Link to="/login">Login</Link>
            </button>
          </div>
          <div className="right">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" value={username} 
              onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
              <input type="email" value={email} 
              onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input type="password" value={password} 
              onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <input type="text" value={name} 
              onChange={(e) => setName(e.target.value)} placeholder="Name" />
              <button type="submit">Register</button>

              <div className="msg">{msg ? <p>{msg}</p> : null}</div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Register