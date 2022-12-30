import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthProvider';

const Task = ({isClicked, setClicked,BootstrapButton, task}) => {
   const id = task._id;
   const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/compleatedtask';
   

    const handleCompleatedTask = () => {

        const compleatedTask = task;
         console.log(compleatedTask);

         fetch('https://mytodo-app-server.vercel.app/compleatedtasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(compleatedTask)
        }).then(res => res.json())
            .then(data => {
                handleDltWP()
                navigate(from, {replace: true})


                if (data.acknowledged) {
                    console.log(data.acknowledged)



                } else {
                    console.log('compleated');

                }
            })
            .catch(er => console.error(er))

        }

        const handleDlt = () =>{
            const agree = window.confirm(`Are you want to delete?`)
            console.log(agree)
            if(agree){
                console.log(id)
               fetch(`https://mytodo-app-server.vercel.app/deletetask/${id}`,{
                method: 'DELETE'})
                .then(res => res.json())
                .then(data => {
                    
                    console.log(data)
                    if(data.deletedCount > 0){
                        alert('user deleted seccessfully')
                        
                        
                    } 
                })
                
            }
        }
        const handleDltWP = () =>{
            
                console.log(id)
               fetch(`https://mytodo-app-server.vercel.app/deletetask/${id}`,{
                method: 'DELETE'})
                .then(res => res.json())
                .then(data => {
                    
                    console.log(data)
                    if(data.deletedCount > 0){
                       
                        
                        
                    } 
                })
                
            
        }



    return (
        <button onClick={() => setClicked(true)} className='w-full max-w-2xl lg:w-4/5 border-2 m-2 bg- bg-zinc-50  border-blue-900 mx-auto rounded-md text-left'>


                            {isClicked ?
                                <>
                                    <div lassName='w-full lg:w-4/5 border-2 border-blue-900  rounded-md  text-left'>

                                        <img className='w-full max-h-60 rounded' src={task.taskFile} alt="" />


                                        <h1 className='px-5 py-2 font-bold text-xl'>{task.taskTitle}</h1>
                                        <h1 className='px-5 py-2 '>{task.taskDescription}</h1>
                                        <div className='flex justify-center'>
                                        <div className='m-2 '><BootstrapButton variant="outlined" onClick={handleCompleatedTask}><h1 className='text-black'>Mark compleated</h1></BootstrapButton></div>
                                        <div className='m-2 '><BootstrapButton variant="outlined" ><h1 onClick={handleDlt} className='text-black'>Delete task</h1></BootstrapButton></div>
                                        </div>


                                    </div>
                                </>
                                :
                                <>
                                    <h1 className='px-5 py-2 '>{task.taskTitle}</h1>
                                </>

                            }

                        </button>
    );
};

export default Task;