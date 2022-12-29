import React, { useEffect, useState } from 'react';

const Comments = ({_id}) => {
    const [comment, setComment]= useState([])
    console.log(comment);

    useEffect(() => {

        fetch(`http://localhost:5000/comment?id=${_id}`)
            .then(res => res.json())
            .then(data => {
                setComment(data)
                console.log(data);
            })

    }, [_id])
    return (
        <h1 className='px-5 py-2 '>Comment</h1>
    );
};

export default Comments;