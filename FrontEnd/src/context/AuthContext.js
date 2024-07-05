import React, { createContext, useState, useContext, useEffect } from 'react';
import Api from '../Services/Api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userLogged, setUserLogged] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const checkToken = async () => {
        setLoading(true);
        try {
            const tokenCookies = Cookies.get('token');
            if (tokenCookies) {
                const tokenData = JSON.parse(tokenCookies);
                const { data } = await Api.get(`/User/byId/${tokenData.id}`);
                setUserLogged(data);
                if (data?.role === "Admin") {
                    navigate('/admin')
                    console.log("admin")
                } else if (data?.role === "User") {
                    console.log("user")
                    navigate('/user')
                }
            }
        } catch (error) {
            console.error('Failed to verify token', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const responseToken = await Api.post('/Authentication', { Email: email, Password: password });
            const token = responseToken.data.token;
            Cookies.set('token', JSON.stringify({ id: responseToken.data.id, token }), { expires: 1 / 3 });
            const responseUser = await Api.get(`/User/byId/${responseToken.data.id}`);
            setUserLogged(responseUser.data);
        } catch (error) {
            console.error('Login failed. Please check your credentials.', error);
            throw new Error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        Cookies.remove('token');
        setUserLogged(null);
    };

    const updateUserLogged = (user) => {
        setUserLogged(user)
    }

    useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ userLogged, loading, login, logout, setLoading, updateUserLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
