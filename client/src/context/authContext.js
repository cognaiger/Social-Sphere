import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

// set the token as authorization header field in request
export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
}

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );

    const login = async (username, password) => {

        try {
            const response = await axios.post("http://localhost:2504/auth/login", {
              username: username,
              password: password
            })
      
            if (response.status === 201) {
              const accessToken = response.data.access_token;
      
              localStorage.setItem('accessToken', accessToken);
      
              setAuthToken(accessToken);
              
              const payload = jwtDecode(accessToken);
              const selectedProperties = ['id', 'name', 'profilePic'];
              const user = {};
              for (const prop of selectedProperties) {
                user[prop] = payload[prop];
              }
              setCurrentUser(user);

              navigate("/");
            } else {
              console.error("Error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}

