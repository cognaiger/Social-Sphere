import { useContext, useState } from 'react';
import './login.scss'
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    const res = await login(username, password);
    if (!res) {
      setMsg("Login failed, please try again!");
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
                <Link to="/register" style={{ textDecoration: "none" }}>Register</Link>
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
              {msg}
            </div>
          </div>
        </div>
    );
}

export default Login