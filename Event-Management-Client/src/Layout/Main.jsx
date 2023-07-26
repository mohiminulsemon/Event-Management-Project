import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const Main = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            Footer
        </div>
    );
};

export default Main;