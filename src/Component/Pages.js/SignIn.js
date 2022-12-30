import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './Context/AuthProvider';
import GoogleIcon from '@mui/icons-material/Google';
import { pink } from '@mui/material/colors';

const SignIn = () => {
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate();
    const [signUpErr, setSignUpErr] = useState('');
    const from = location.state?.from?.pathname || '/';
const { createUser, updateUserProfile, providerLogin, googleProvider} = useContext(AuthContext)
    
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

    const handleSignUp = data => {

        data.preventDefault();
        const form = data.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value
       console.log(name, email, password);
        


        setSignUpErr('')
        console.log(data);
        createUser(email, password)
        .then(result =>{
            const user = result.user;
            setLoading(false)
            console.log(user);
            navigate(from, { replace: true })
            // const userInfo = {
            //     displayName: data.name
            // }
            updateUserProfile(name)
              .then(() => {

                
            })
            

            .catch(error => {
                console.log(error);
                setSignUpErr(error.message)
            })
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
            className=' mx-auto mt-2 p-5  border-2  rounded min-h-screen'
        >

            <div className=' max-w-screen-sm mx-auto'>
            <div className='flex flex-col justify-center '>
            <h1  className='text-center mx-5 text-2xl font-bold'>New user signup</h1>
            <form  onSubmit={handleSignUp}>
                <div>
                    <h1 className='px-2 font-semibold text-blue-900'>Name</h1>
                </div>
                <input className='w-full border-blue-500  rounded px-5 py-2' type="text" name='name' placeholder='Name' required></input>
                <div >
                    <h1 className='px-2 font-semibold text-blue-900'>Email</h1>
                </div>
                <input className='w-full border-blue-500  rounded px-5 py-2' type="email" name='email' placeholder='Email' required></input>
                <div >
                    <h1 className='px-2 font-semibold text-blue-900'>Password</h1>
                </div>
                <input className='w-full border-blue-500  rounded px-5 py-2' type="password" name='password' placeholder='Password' required></input>
                {/* <Button className='mb-3' type="submit" variant="outlined">Add task</Button> */}
                <div className='m-2 ml-0'><BootstrapButton variant="outlined" type="submit">Sign up</BootstrapButton></div>
                {<h1 className='text-red-600 font-semibold'>{signUpErr}</h1>}

                <div className='mx-auto flex justify-center'><Button variant="outlined"  onClick={handleGoogleSignIn} ><GoogleIcon ></GoogleIcon> Google oneclick SignIn</Button></div>

            </form>
            <p className='text-center pb-5'>Already have an account <Link className='font-bold' variant="outlined" to='/login'>Login</Link></p>
            </div>
            </div>

        </div>
    );
};

export default SignIn;