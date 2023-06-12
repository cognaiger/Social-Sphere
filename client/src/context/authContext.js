import React from "react";
import { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setrCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );

    const login = () => {
        setrCurrentUser({
            id: 1,
            name: "Ubbe",
            profilePic:
                "https://m.media-amazon.com/images/I/61I+RPcXGbL.jpg"
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

