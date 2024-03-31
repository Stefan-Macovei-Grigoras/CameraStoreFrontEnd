/* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Create() {
//   const [values, setValues] = useState({
//     name: '',
//     price: '',
//     description: '',
//   });

//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post('http://localhost:3000/cameras', values)
//       .then(res => {
//         console.log(res);
//         navigate('/');
//       })
//       .catch(err => console.log(err));
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setValues({ ...values, [name]: value });
//   };

//   return (
//     <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
//       <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
//         <h1>Add a camera</h1>
//         <form onSubmit={handleSubmit}>
//           <div className='mb-2'>
//             <input type="text" name='name' className="form-control" placeholder='Enter Name' onChange={handleChange} />
//           </div>
//           <div className='mb-2'>
//             <input type="number" name='price' className='form-control' placeholder='Enter Price' onChange={handleChange} />
//           </div>
//           <div className='mb-3'>
//             <input type="text" name='description' className='form-control' placeholder='Enter Description' onChange={handleChange} />
//           </div>
//           <button type="submit" className='btn btn-success'>Submit</button>
//           <Link to="/" className='btn btn-primary ms-3'>Back</Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Create;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/cameras', values)
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
                <h1>Add a camera</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <input type="text" name='name' className="form-control" placeholder='Enter Name' onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <input type="number" name='price' className='form-control' placeholder='Enter Price' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" name='description' className='form-control' placeholder='Enter Description' onChange={handleChange} />
                    </div>
                    <button type="submit" className='btn btn-success'>Submit</button>
                    <Link to="/" className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
    );
}

export default Create;
