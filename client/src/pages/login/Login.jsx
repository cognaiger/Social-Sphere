import { useContext, useState } from 'react';
import './login.scss'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:2504/auth/login", {
        username: username,
        password: password
      })

      if (response.status === 201) {
        const accessToken = response.data.access_token;

        localStorage.setItem('accessToken', accessToken)

        navigate("/");

        login();
      } else {
        setMsg("Login fail, please try again");
      }
    } catch (error) {
      setMsg("Login fail, please try again");
    }
  };

    return (
        <div className="login">
          <div className="card">
            <div className="left">
              <h1>Hello World.</h1>
              <p>
                Want to find friend and enjoy making friends out of strangers? Join us today and enjoy
                the joy of connecting with people
              </p>
              <span>Don't you have an account?</span>
              <button>
                <Link to="/register">Register</Link>
              </button>
            </div>
            <div className="right">
              <h1>Login</h1>
              <form>
                <input type="text" placeholder="Username" value={username} 
                onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default Login