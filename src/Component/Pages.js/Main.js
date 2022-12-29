import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Main = () => {
    return (
        <div className='lg:w-3/4 mx-auto'>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;