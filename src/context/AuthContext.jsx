"use client";
import React, { createContext, useEffect, useContext, useState, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter, usePathname } from 'next/navigation';
require('dotenv').config({ path: '../../backend/.env' });

const InitialState = {
    isAuthenticated: false,
    user: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { isAuthenticated: true, user: action.payload };
        case 'LOGOUT':
            return { isAuthenticated: false, user: null };
        default:
            return state;
    }
};

export const AuthContext = createContext({
    state: InitialState,
    dispatch: () => null
});

export function AuthProvider({ children }) {
    const path = usePathname();
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, InitialState);

    const [authToken, setAuthToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            
            const tokens = document.cookie.split('token=').pop().split(';').shift();
            setAuthToken(tokens ? tokens : null);
            if (authToken) {
                dispatch({ type: 'LOGIN', payload: tokens });
            }
            if (!tokens) {
                if (path === '/'){
                    document.cookie = ''
                    router.push('/login');
                    dispatch({ type: 'LOGOUT' });
                }
            }
        }
    }, [authToken]);

    console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
