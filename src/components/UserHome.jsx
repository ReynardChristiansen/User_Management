import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { PlayerContext } from '../context/UserContext';
import axios from 'axios';
import UserDetailsforUser from './UserDetailsforUser';

const UserHome = () => {
    const { userRole, setUserRole, userName, setUserName, userToken, setUserToken, user, setUser, deletes } = useContext(PlayerContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('name');
        Cookies.remove('role');
        setUserToken('');
        setUserName('');
        setUserRole('');
        navigate('/');
    };


    useEffect(() => {
        const fetchUsers = async () => {
            const token = Cookies.get('token');
            console.log(token);
            try {
                const response = await axios.get('https://api-user-five.vercel.app/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
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
    }, [userToken]);
    

    const filteredUsers = user.filter((user) => {
        return user.user_name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/UserHome" className="text-white font-semibold text-lg">
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

            <div className="container mx-auto p-4 flex flex-col items-center">
                <div className="mb-4 w-[40%]">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="w-[60%]">
                    {filteredUsers && 
                                filteredUsers.map((item) => (
                                    <UserDetailsforUser key={item._id} user={item} />
                                ))
                        }
                </div>
            </div>

        </div>
    );
};

export default UserHome;
