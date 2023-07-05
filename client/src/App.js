import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx"
import { setAuthToken } from "./context/authContext.js";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Layout from "./components/shared/Layout.jsx";
import PostView from "./components/postView/postView.jsx";

// validate expiration of token


function App() {

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    setAuthToken(token);

    if (token === null) {
      return <Navigate to="/login" />;
    } 

    return children;
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/posts/:id" element={<PostView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
