import "./register.scss"
import { Link } from "react-router-dom"

const Register = () => {
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
              <form>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="text" placeholder="Name" />
                <button>Register</button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default Register