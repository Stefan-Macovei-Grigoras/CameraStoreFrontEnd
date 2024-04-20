/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

// export default Read;
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
//import { text } from 'stream/consumers';

function Read() {
    const [camera, setCamera] = useState({});
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const [values, setValues] = useState({});

    useEffect(() => {
        // Fetch camera details
        axios.get(`http://localhost:3000/cameras/${id}`)
            .then(res => {
                setCamera(res.data);
                const cameraId = res.data.id;
                axios.get(`http://localhost:3000/reviews/${cameraId}`)
                    .then(res => {
                        setReviews(res.data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReview = {
            ...values,
            cameraId: camera.cameraId, // Assign the cameraId from the camera state
            text: values.text          
        };
        console.log('New Review:', newReview); // Log the new review object
        axios.post('http://localhost:3000/reviews', newReview)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setValues({ ...values, [name]: value });
    };

    return (
        <div className='d-flex flex-column w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h3>Camera details</h3>
                <div className='mb-2'>
                    <strong>Name: {camera.cameraName}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Price: {camera.cameraPrice}</strong>
                </div>
                <div className='mb-3'>
                    <strong>Description: {camera.cameraDescription}</strong>
                </div>
                <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>
            </div>
            <div className="card text-center">
                <h4 className="card-header">Testimonials</h4>
                <div className="testimonial-list border-1">
                    {reviews.map(review => (
                        <div className="card-body border rounded mb-4" key={review.id}>
                            <p className="card-textmt-2">{review.text}</p>
                        </div>
                    ))}
                </div>
                <div className="card-footer">
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <input type="text" name='text' className="form-control" placeholder='Enter Review' onChange={handleChange} />
                    </div>
                    <button type="submit" className='btn btn-success'>Submit</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Read;
