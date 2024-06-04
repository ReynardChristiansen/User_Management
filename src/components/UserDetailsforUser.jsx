import React, { useContext } from 'react';
import { PlayerContext } from '../context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetails = ({ user }) => {
    const { userToken, setDeletes } = useContext(PlayerContext);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} ` +
               `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };


    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
            <div className="p-6">
                <p className="text-lg font-semibold mb-2"><strong>Name: </strong>{user.user_name}</p>
                <p className="text-lg font-semibold mb-2"><strong>Role: </strong>{user.user_role}</p>
                <p className="text-lg font-semibold"><strong>Created At: </strong>{formatDate(user.createdAt)}</p>
            </div>
        
        </div>
    );
};

export default UserDetails;
