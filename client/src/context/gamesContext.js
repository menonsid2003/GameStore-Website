import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const gamesContext = createContext()

export const gamesContextProvider = ({ children }) => {
    const [currentGame, setCurrentGame] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data)
    };

    const logout = async (inputs) => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};