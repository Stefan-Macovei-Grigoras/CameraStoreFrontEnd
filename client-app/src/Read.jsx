import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

function Read() {
    const [camera, setCamera] = useState({});
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }});

    useEffect(() => {
        if (page !== 1) {
            fetchMore();
        }
    }, [page]);

    const fetchData = () => {
        const token = sessionStorage.getItem('token');
        axios.get(`http://localhost:3000/cameras/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setCamera(res.data);
            const cameraId = res.data.cameraId;
            axios.get(`http://localhost:3000/reviews/${cameraId}?page=1`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setReviews(res.data);
                if (res.data.length === 0) {
                    setHasMore(false);
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };

    const fetchMore = () => {
        const token = sessionStorage.getItem('token');
        axios.get(`http://localhost:3000/cameras/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                const cameraId = res.data.cameraId;
                axios.get(`http://localhost:3000/reviews/${cameraId}?page=${page}`,{       
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            })
                    .then(res => {
                        setReviews(prevReviews => [...prevReviews, ...res.data]);
                        if (res.data.length === 0) {
                            setHasMore(false);
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const newReview = {
            ...values,
            cameraId: camera.cameraId,
            reviewText: values.text
        };
        axios.post('http://localhost:3000/reviews', newReview, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }})
            .then(res => {
                fetchData();
                setValues({});
            })
            .catch(err => console.log(err));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleDelete = (id) => {
        const token = sessionStorage.getItem('token');
        const confirmDelete = window.confirm('Are you sure you want to delete this review?');
        if (confirmDelete) {
            axios.delete(`http://localhost:3000/reviews/${id}`,{       
                headers: {
                    Authorization: `Bearer ${token}`
                }
        })
                .then(() => {
                    // Fetch all reviews again to repopulate the state
                    fetchData();
                })
                .catch(err => console.log(err));
        }
    };
    
    

    const refreshFunction = () => {
        fetchData();
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
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
            <div className="card text-center mt-3 bg-white shadow px-5">
                <h4 className="card-header">Testimonials</h4>
                <InfiniteScroll
                    dataLength={reviews.length}
                    next={() => setPage(page + 1)}
                    hasMore={hasMore}
                    //loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    pullDownToRefresh
                    pullDownToRefreshContent={<h3>Pull down to refresh</h3>}
                    releaseToRefreshContent={<h3>Release to refresh</h3>}
                    refreshFunction={refreshFunction}
                    endMessage={<p style={{ textAlign: 'center' }}>Yay! You have seen it all</p>}
                >
                    <div id="scrollableDiv" style={{ maxHeight: '400px', overflow: 'auto' }}>
                        <div className="testimonial-list border-1">
                            {reviews.map(review => (
                                <div className="card-body border rounded mb-4" key={review.reviewId}>
                                    <p className="card-text mt-2">{review.reviewText}</p>
                                    <button onClick={() => handleDelete(review.reviewId)} className="btn btn-danger">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
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
