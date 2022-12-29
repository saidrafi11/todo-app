import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './Context/AuthProvider';
import Task from './Task';

const MyTask = () => {
    const [isClicked, setClicked] = useState(false)
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/compleatedtask';

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

    const { user } = useContext(AuthContext)
    const [myTasks, setMyTasks] = useState([])
    console.log(myTasks);



    useEffect(() => {

        fetch(`https://mytodo-app-server.vercel.app/mytasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyTasks(data)
                console.log(data);
            })

    }, [user])


    





    return (
        <div style={{
            backgroundColor: '#0093E9',
            backgroundImage: 'linear-gradient(23deg, #0093E9 0%, #f8fffe 100%)'

        }}
            className=' mx-auto mt-2 p-5  border-2 rounded min-h-screen'
        >
            <h1 className='text-center mx-5 text-2xl font-bold'>My tasks</h1>

            <div className='flex flex-col justify-center '>

                {
                    myTasks?.map((task, i) =><Task
                    key={i}

                        task={task} 
                        isClicked={isClicked}
                        setClicked={setClicked}
                        BootstrapButton={BootstrapButton}></Task>

                        )
                }





            </div>

        </div>
    );
};

export default MyTask;