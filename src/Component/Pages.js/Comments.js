import React, { useEffect, useState } from 'react';

const Comments = ({_id}) => {
    const [comment, setComment]= useState([])
    console.log(comment);

    useEffect(() => {

        fetch(`https://mytodo-app-server.vercel.app/comment?id=${_id}`)
            .then(res => res.json())
            .then(data => {
                setComment(data)
                console.log(data);
            })

    }, [_id])
    return (
        <h1 className='px-5 py-1 '>{comment.map(c=><p>{c.comment}</p>)}</h1>
    );
};

export default Comments;