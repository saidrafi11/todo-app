import React, { useContext } from 'react';
import Comments from './Comments';
import { AuthContext } from './Context/AuthProvider';

const CTask = ({ isClicked, setClicked, BootstrapButton, task }) => {
    console.log(task);

const _id = task._id


    const handleComment = event => {
        event.preventDefault();
        const form = event.target;
        const comment = form.comment.value;
        const commentBody = {
            _id: _id,
            comment: comment
        }
        console.log(comment)

        fetch('https://mytodo-app-server.vercel.app/addcomment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(commentBody)
            }).then(res => res.json())
                .then(data => {
                    // navigate(from, {replace: true})
                    console.log(data);
    
    
                    if (data.acknowledged) {
                        console.log(data.acknowledged)
    
    
    
                    } else {
                        console.log('cmt added');
                        //   toast.success("Product added!", "Services added success", "success");
                        //   navigate(from, { replace: true })
                        //   form.reset();
                    }
                })
                .catch(er => console.error(er))
      


    }

    const handleDlt = () =>{
        const agree = window.confirm(`Are you want to delete?`)
        console.log(agree)
        if(agree){
            console.log(_id)
           fetch(`https://mytodo-app-server.vercel.app/deletecompleatedtask/${_id}`,{
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

    



    return (
        <button onClick={() => setClicked(true)} className='w-full max-w-2xl lg:w-4/5 border-2 m-2 border-blue-900 mx-auto rounded-md text-left'>


            {isClicked ?
                <>
                    <div lassName='w-full lg:w-4/5 border-2 border-blue-900  rounded-md  text-left'>

                        <img className='w-full max-h-60 rounded' src={task.taskFile} alt="" />


                        <h1 className='px-5 py-2 font-bold text-xl'>{task.taskTitle}</h1>
                        <h1 className='px-5 py-2 '>{task.taskDescription}</h1>
                        <h1 className='px-5 py-2 '>Comments:</h1>
                        <Comments _id={_id}></Comments>
                        


                        <form onSubmit={handleComment} className=' m-2'>
                            <input className=' h-10 w-full p-5 border-blue-500  rounded ' type="text" name='comment' placeholder='Add comment' required></input>
                            <div className='mt-2 '><BootstrapButton  type="submit"><h1 className='text-black'>Comment</h1></BootstrapButton></div>
                            <div className='mt-2 '><BootstrapButton ><h1 onClick={handleDlt} className='text-black'>Delete task</h1></BootstrapButton></div>
                        </form>
                        





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

export default CTask;