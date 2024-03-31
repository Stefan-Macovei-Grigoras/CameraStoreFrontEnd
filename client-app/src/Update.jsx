/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useEffect, useState } from "react"
// import { Link, useNavigate, useParams } from "react-router-dom";

// function Update() {
//     //const[data, setData] = useState([])
//     const{id} = useParams();

//     const [values, setValues] = useState({
//         name: '',
//         price: '',
//         description: '',
//       });

//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('http://localhost:3000/cameras/'+id)
//         .then(res => {
//             setValues(res.data)
//             console.log(res.data)
//         })
//         .catch(err => console.log(err));
//     },[id])

//     const handleUpdate = (event) => {
//         event.preventDefault();
//         axios.put('http://localhost:3000/cameras/'+id, values)
//           .then(res => {
//             console.log(res);
//             navigate('/');
//           })
//           .catch(err => console.log(err));
//     };


//     return (
//      <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
//       <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
//         <h1>Update Camera</h1>
//         <form onSubmit={handleUpdate}>
//           <div className='mb-2'>
//             <input type="text" name='name' className="form-control" placeholder='Enter Name' 
//             value = {values.name} onChange={e=> setValues({...values, name: e.target.value})}/>
//           </div>
//           <div className='mb-2'>
//             <input type="number" name='price' className='form-control' placeholder='Enter Price'
//             value = {values.price} onChange={e=> setValues({...values, price: e.target.value})}/>
//           </div>
//           <div className='mb-3'>
//             <input type="text" name='description' className='form-control' placeholder='Enter Description'
//             value = {values.description} onChange={e=> setValues({...values, description: e.target.value})}/>
//           </div>
//           <button type="submit" className='btn btn-success'>Update</button>
//           <Link to="/" className='btn btn-primary ms-3'>Back</Link>
//         </form>
//       </div>
//     </div>
//     )
// }

// export default Update;  

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const { id } = useParams();
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/cameras/${id}`)
            .then(res => setValues(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3000/cameras/${id}`, values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Update Camera</h1>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <input type="text" name='name' className="form-control" placeholder='Enter Name' value={values.name || ''} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <input type="number" name='price' className='form-control' placeholder='Enter Price' value={values.price || ''} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" name='description' className='form-control' placeholder='Enter Description' value={values.description || ''} onChange={handleChange} />
                    </div>
                    <button type="submit" className='btn btn-success'>Update</button>
                    <Link to="/" className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
    );
}

export default Update;
