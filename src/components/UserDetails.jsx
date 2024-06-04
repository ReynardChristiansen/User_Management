import React, { useContext } from 'react';
import { PlayerContext } from '../context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetailforUser = ({ user }) => {
    const { userToken, setDeletes } = useContext(PlayerContext);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} ` +
               `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://api-user-five.vercel.app/api/users/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });

            if (response.status === 200) {
                setDeletes(prev => !prev);
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
            <div className="p-6">
                <p className="text-lg font-semibold mb-2"><strong>Name: </strong>{user.user_name}</p>
                <p className="text-lg font-semibold mb-2"><strong>Role: </strong>{user.user_role}</p>
                <p className="text-lg font-semibold"><strong>Created At: </strong>{formatDate(user.createdAt)}</p>
            </div>
            
            <div className="flex justify-between p-4 border-t">
                <button className="text-red-500 hover:text-red-700 font-semibold" onClick={handleDelete}>
                    Delete
                </button>
                <Link to={`/AdminUpdateUser/${user._id}`} className="text-blue-500 hover:text-blue-700 font-semibold">
                    Update
                </Link>
            </div>
        </div>
    );
};

export default UserDetailforUser;
