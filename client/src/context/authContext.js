import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );

    const login = (id, name, profilePic) => {
        setCurrentUser({
            id: id,
            name: name,
            profilePic: profilePic
        });

        navigate("/");
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

