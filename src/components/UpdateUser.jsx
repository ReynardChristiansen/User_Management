import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PlayerContext } from '../context/UserContext';

const UpdateUser = () => {
    const { userToken } = useContext(PlayerContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        user_name: '',
        user_role: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://api-user-five.vercel.app/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    navigate('/NotFound');
                }
            } catch (error) {
                navigate('/NotFound');
            }
        };

        fetchUser();
    }, [id, userToken]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`https://api-user-five.vercel.app/api/users/${id}`, user, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.status === 200) {
                console.log('User updated successfully');
                navigate('/AdminHome');
            } else {
                console.error('Failed to update user:', response.status);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="user_name"
                            name="user_name"
                            value={user.user_name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="user_role" className="block text-sm font-medium text-gray-700">
                            Role:
                        </label>
                        <input
                            type="text"
                            id="user_role"
                            name="user_role"
                            value={user.user_role}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
