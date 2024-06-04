import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/login';
import AdminHome from './AdminHome';
import UserHome from '../components/UserHome';
import PageNotFound from '../components/NotFound';
import UserElement from '../components/UserElement';
import AdminElement from '../components/AdminElement';
import Cookies from 'js-cookie';
import {PlayerContext} from '../context/UserContext';
import UpdateUser from './UpdateUser';
import Register from './Register';

const Display = () => {
    const {userRole, setUserRole, userName, setUserName, userToken, setUserToken} = useContext(PlayerContext);

    useEffect(() => {
        const role = Cookies.get('role');
        setUserRole(role);
        console.log(userRole);
    }, );

    return (
        <div>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Register' element={<Register></Register>} />
                
                <Route path='/UserHome' element={<UserElement userRole={userRole}><UserHome /></UserElement>} />
                
                <Route path='/AdminHome' element={<AdminElement userRole={userRole}><AdminHome /></AdminElement>} />
                <Route path='/AdminUpdateUser/:id' element={<AdminElement userRole={userRole}><UpdateUser /></AdminElement>} />

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default Display;
