import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { PlayerContext } from '../context/UserContext';
import axios from 'axios';
import UserDetails from './UserDetails';

const Home = () => {    
    const { userRole, setUserRole, userName, setUserName, userToken, setUserToken, user, setUser, deletes } = useContext(PlayerContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://api-user-five.vercel.app/api/users', {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    console.error('Error fetching users:', response.status);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        if (userToken) {
            fetchUsers();
        }
    }, [deletes, userToken]);

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('name');
        Cookies.remove('role');
        setUserToken('');
        setUserName('');
        setUserRole('');
        navigate('/');
    };

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/AdminHome" className="text-white font-semibold text-lg">
                                User Management
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <button onClick={handleLogout} className="text-black hover:bg-[#f0f0f0] px-3 py-2 rounded-md bg-white">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto p-4">
                <div>
                    {user && user.filter(item => item.user_name !== Cookies.get('name')).map((item) => (
                        <UserDetails key={item._id} user={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
