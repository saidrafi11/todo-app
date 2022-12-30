import { Button, Icon } from '@mui/material';
import React, { useContext, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import styled from 'styled-components';
import { AuthContext } from './Context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
// import { styled } from '@mui/material/styles';
const AddTask = () => {
    const [isClicked, setClicked] = useState(false)
    const [isClickedImg, setClickedImg] = useState(false)
    const [imgInput, setShowImgInput] = useState(false)
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/mytask';

    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#ffffff',
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

    const taskData = event => {
        event.preventDefault();
        const form = event.target;
        const taskTitle = form.taskTitle.value;
        const taskDescription = form.taskDescription.value;
        // const taskFile = form.taskFile.value;
        const taskFile = event.target.taskFile.files[0]
        console.log(taskTitle, taskDescription)
        setLoading(true)

        const formData = new FormData()
        formData.append('image', taskFile)
        const url = 'https://api.imgbb.com/1/upload?expiration=600&key=6484beaaddeddba5a7b0b078a5ef47d8'

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.data.display_url)




                const task = {
                    userEmail: user.email,
                    taskTitle: taskTitle,
                    taskDescription: taskDescription,
                    taskFile: data.data.display_url
                }
                console.log(task);



                fetch('https://mytodo-app-server.vercel.app/mytasks', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(task)
                }).then(res => res.json())
                    .then(data => {
                        setLoading(false)
                        navigate(from, { replace: true })
                        console.log(data);


                        if (data.acknowledged) {
                            console.log(data.acknowledged)



                        } else {
                            console.log('task added');
                            //   toast.success("Product added!", "Services added success", "success");
                            //   navigate(from, { replace: true })
                            //   form.reset();
                        }
                    })
                    .catch(er => console.error(er))


            })

    }




    return (
        <div style={{
            backgroundColor: '#0093E9',
            backgroundImage: 'linear-gradient(23deg, #0093E9 0%, #f8fffe 100%)'

        }} className=' mx-auto mt-2 p-5  border-2 rounded min-h-screen'>
            <h1 className='text-center m-5 text-2xl font-bold'>Add task</h1>


            <div className='max-w-screen-sm mx-auto' onMouseOver={() => setClicked(true)} >
                {isClicked ?

                    <>
                        <div className='w-full p-5 border-blue-900 border-2  rounded '>
                            <form onKeyDown={e => e.key === 'Enter' ? taskData : ''} onSubmit={taskData} action="">
                                <h1 className='px-2 font-semibold text-blue-900'>Task title</h1>
                                <input onKeyUp={() => setShowImgInput(true)} className='w-full border-blue-500  rounded px-5 py-2' type="text" name='taskTitle' placeholder='Task title' required></input>
                                {imgInput ?
                                    <>

                                        <div >
                                            <h1 className='px-2 font-semibold text-blue-900'>Task description</h1>

                                            <input className='w-full border-blue-500  rounded px-5 py-2' type="text" name='taskDescription' placeholder='Add Task' required></input>
                                            <h1 className='px-2 font-semibold text-blue-900'>Add Image</h1>
                                        </div>
                                        <input name='taskFile' className='mx-2 w-full' type="file" required/>
                                        {/* <Button className='mb-3' type="submit" variant="outlined">Add task</Button> */}
                                        <div className='m-2'><BootstrapButton variant="outlined" type="submit">
                                            {
                                                loading ?
                                                    <>
                                                         Add task
                                                    </>
                                                    :
                                                    <>
                                                    <InfinitySpin 
                                                            width='50'
                                                            color="#0000FF"
                                                        />
                                                       
                                                    </>
                                            }

                                        </BootstrapButton></div>




                                    </>
                                    :

                                    <>




                                    </>}


                            </form>

                        </div>



                    </>

                    :
                    <>

                        <div className='w-full border-blue-700 border-2  rounded '>

                            <h1 className='font-bold text-blue-900 my-auto py-2 px-5'><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon> Add Task</h1>

                        </div>

                    </>

                }
            </div>


        </div>
    );
};

export default AddTask;