import React from "react";
import { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );

    const login = (id, name, profilePic) => {
        setCurrentUser({
            id: id,
            name: name,
            profilePic: profilePic
        });
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

