import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

export const PlayerContext = createContext();

const UserContextProvider = (props) => {
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [userToken, setUserToken] = useState('');
    const [deletes, setDeletes] = useState('');
    const [user, setUser] = useState([]);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setUserToken(token);
        }
    }, []);
    

    const contextValue = {
        userRole,
        setUserRole,
        userName,
        setUserName,
        setUserToken,
        userToken,
        user, 
        setUser,
        deletes,
        setDeletes
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );

}

export default UserContextProvider;
