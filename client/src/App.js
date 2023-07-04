import { Outlet, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx"
import { setAuthToken } from "./context/authContext.js";
import Register from "./pages/register/Register.jsx";
import NavBar from "./components/navBar/NavBar.jsx";
import LeftBar from "./components/leftBar/LeftBar.jsx";
import RightBar from "./components/rightBar/RightBar.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.js"

function App() {

  const currentUser = useContext(AuthContext);
  const token = localStorage.getItem("accessToken");
  setAuthToken(token);

  const Layout = () => {
    return (
      <div>
      <NavBar />
        <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
        </div>
      </div>
    )
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
