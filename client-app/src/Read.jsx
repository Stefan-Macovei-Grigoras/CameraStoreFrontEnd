/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useEffect, useState } from "react"
// import { Link, useParams } from "react-router-dom";
// function Read() {
//     const[data, setData] = useState([])
//     const{id} = useParams();
//     useEffect(() => {
//         axios.get('http://localhost:3000/cameras/'+id)
//         .then(res => setData(res.data))
//         .catch(err => console.log(err));
//     },[])
//     return (
//         <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
//             <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
//                 <h3>Camera details</h3>
//                 <div className='mb-2'>
//                     <strong>Name: {data.name}</strong>
//                 </div>
//                 <div className='mb-2'>
//                     <strong>Price: {data.price}</strong>
//                 </div>
//                 <div className='mb-3'>
//                     <strong>Description: {data.description}</strong>
//                 </div>
//                 <Link to={`/update/${id}`} className='btn btn-success' >Edit</Link>
//                 <Link to="/" className='btn btn-primary ms-3'>Back</Link>
//             </div>
//         </div>
//     );
// }

// export default Read;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios

function Read() {
    const [camera, setCamera] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/cameras/${id}`)
            .then(res => setCamera(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h3>Camera details</h3>
                <div className='mb-2'>
                    <strong>Name: {camera.name}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Price: {camera.price}</strong>
                </div>
                <div className='mb-3'>
                    <strong>Description: {camera.description}</strong>
                </div>
                <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>
            </div>
        </div>
    );
}

export default Read;
