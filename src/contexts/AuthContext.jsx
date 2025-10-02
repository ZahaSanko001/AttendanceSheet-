import React, { createContext, useState, useEffect, Children } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginApi } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) setUserToken(token);
        };
        loadToken();
    }, []);

    const login = async (email, password) => {
        try {
            const token = await loginApi(email, password);
            setUserToken(token);
            await AsyncStorage.setItem("token", token);
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    const logout = async () => {
        setUserToken(null);
        await AsyncStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ userToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};