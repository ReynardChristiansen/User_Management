import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { userRole, setUserRole, userName, setUserName, userToken, setUserToken } = useContext(PlayerContext);

    useEffect(() => {
        const userToken = Cookies.get('token');
        const userRole = Cookies.get('role');

        if (!userToken) {
            navigate('/');
        } else {
            if (userRole === "Admin") {
                navigate('/AdminHome');
            } else {
                navigate('/UserHome');
            }
        }
    }, []);

    const [formData, setFormData] = useState({
        user_name: '',
        user_password: ''
    });

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api-user-five.vercel.app/api/users/login', {
                user_name: formData.user_name,
                user_password: formData.user_password
            });

            if (response.data.token) {
                Cookies.set('token', response.data.token, { expires: 1 });
                Cookies.set('name', response.data.user_name, { expires: 1 });
                Cookies.set('role', response.data.user_role, { expires: 1 });

                setUserName(response.data.user_name);
                setUserRole(response.data.user_role);
                setUserToken(response.data.token);

                setError(null);

                const userRole = Cookies.get('role');
                if (userRole === "Admin") {
                    navigate('/AdminHome');
                } else {
                    navigate('/UserHome');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            id="user_name"
                            value={formData.user_name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user_password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="user_password"
                            id="user_password"
                            value={formData.user_password}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-sm text-gray-600">
                        Don't have an account? <Link to="/Register" className="text-indigo-600 hover:underline">Register here</Link>.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
