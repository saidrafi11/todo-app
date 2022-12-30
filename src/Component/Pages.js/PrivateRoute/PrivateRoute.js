import React, { useContext } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
           <InfinitySpin  
  width='200'
  color="#0000FF"
/>
        </div>
    }

    if (user) {
        return children;
    }

    return (
         <Navigate to='/login' state={{ from: location }} replace></Navigate>
    );
};

export default PrivateRoute;