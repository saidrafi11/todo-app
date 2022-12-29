import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from './Context/AuthProvider';
import CTask from './CTask';
import Task from './Task';

const CompleatedTask = () => {
    const [isClicked, setClicked] = useState(false)
    const { user } = useContext(AuthContext)
    const [myCompleatedTasks, setMyCompleatedTasks] = useState([])


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
        ]})

        useEffect(() => {

            fetch(`http://localhost:5000/compleatedtasks?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyCompleatedTasks(data)
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
            <h1  className='text-center mx-5 text-2xl font-bold'>Compleated task</h1>

            <div className='flex flex-col justify-center '>

                {
                    myCompleatedTasks?.map((task,i)=><CTask
                    key={i}

                        task={task} 
                        isClicked={isClicked}
                        setClicked={setClicked}
                        BootstrapButton={BootstrapButton}
                    >

                    </CTask>)
                }
            {/* <button onClick={() => setClicked(true)} className='w-full lg:w-4/5 border-2 m-2 border-blue-900 mx-auto rounded-md text-left'>
                

                {isClicked? 
                <>
                <div>
                <div lassName='w-full lg:w-4/5 border-2 border-blue-900  rounded-md  text-left'>
                    <img className='w-full rounded' src="https://images3.alphacoders.com/116/116517.jpg" alt="" />
                <h1 className='px-5 py-2 font-bold text-xl'>Task title</h1>
                <h1 className='px-5 py-2 '>Task Description</h1>
                <div className='m-2 '><BootstrapButton  type="submit"><h1 className='text-black'>Mark compleated</h1></BootstrapButton></div>

                
                </div>
                
                </div>
                </>
                :
                <>
                <h1 className='px-5 py-2 '>Task title</h1>
                </>}

            </button>
            */}

            </div>
            
        </div>
    );
};

export default CompleatedTask;