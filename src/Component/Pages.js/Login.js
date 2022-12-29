import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './Context/AuthProvider';

const Login = () => {
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';



    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,

        borderColor: '#0063cc',
        textColor: '#ffffff',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ]
    })



    const [loginErr, setLoginErr] = useState('');
    console.log(loginErr);
    const [loginUserEmail, setLoginUserEmail ] = useState('')
    console.log(loginUserEmail);

    const {login, providerLogin, googleProvider} = useContext(AuthContext)
    const handleLogin = data => {

        data.preventDefault();
        const form = data.target;
        
        const email = form.email.value;
        const password = form.password.value
       console.log(email, password);
        


        setLoginErr('')
       
        login(email, password)
        .then(result => {
            const user = result.user 
            console.log(user);

            setLoginUserEmail(user)
            navigate(from, { replace: true })
        })
        .catch(error => {
            setLoginErr(error.message)
        })
    }

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
          .then(result => {
            const user = result.user
            console.log(user);
            navigate(from, { replace: true })
          
    
              
          }).catch(error => console.error(error))
      }


    return (
        <div style={{
            backgroundColor: '#0093E9',
            backgroundImage: 'linear-gradient(23deg, #0093E9 0%, #f8fffe 100%)'

        }}
            className=' mx-auto mt-2 p-5  border-2 rounded min-h-screen'
        >

            <div className='flex flex-col justify-center '>
            <h1  className='text-center mx-5 text-2xl font-bold'>Login</h1>
            <form  onSubmit={handleLogin}>
                
            <div >
                    <h1 className='px-2 font-semibold text-blue-900'>Email</h1>
                </div>
                <input className='w-full border-blue-500  rounded px-5 py-2' type="email" name='email' placeholder='Email' required></input>
                <div >
                    <h1 className='px-2 font-semibold text-blue-900'>Password</h1>
                </div>
                <input className='w-full border-blue-500  rounded px-5 py-2' type="password" name='password' placeholder='Password' required></input>
                {/* <Button className='mb-3' type="submit" variant="outlined">Add task</Button> */}
                <div className='m-2'><BootstrapButton type="submit">Login</BootstrapButton></div>

                <div className='mx-auto'><Button onClick={handleGoogleSignIn} >Google SignIn</Button></div>






            </form>
            <p className='text-center pb-5'>New user?? <Link to='/signup'>Signup</Link></p>
            </div>

        </div>
    );
};

export default Login;