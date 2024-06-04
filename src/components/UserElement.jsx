import React from 'react';

const UserElement = ({ userRole, children }) => {
    console.log(userRole);
    if (userRole == "User") {
        return (
            <>
                {children}
            </>
        );
    } else {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl">You do not have access to this page!</h1>
            </div>
        )
    }
}

export default UserElement;