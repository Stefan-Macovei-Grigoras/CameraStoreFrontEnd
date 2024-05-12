/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Home() {
//     const [cameras, setCameras] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [perPage] = useState(5); // Number of items per page
//     const [totalPages, setTotalPages] = useState(1); // Total number of pages
//     const [isLoading, setIsLoading] = useState(false);
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(handleObserver, {
//             root: null,
//             rootMargin: "20px",
//             threshold: 1.0
//         });

//         if (containerRef.current) {
//             observer.observe(containerRef.current)
//         }

//         return () => {
//             if (containerRef.current) {
//                 observer.unobserve(containerRef.current);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const startIndex = (currentPage - 1) * perPage;

//         setIsLoading(true);
//         axios.get(`http://localhost:3000/cameras?_start=${startIndex}&_limit=${perPage}`)
//             .then(res => {
//                 console.log("Cameras Retrieved:");
//                 res.data.forEach(camera => {
//                     console.log(camera);
//                 });
//                 setCameras(prevCameras => [...prevCameras, ...res.data]);
//                 setIsLoading(false);
//             })
//             .catch(err => {
//                 console.log(err);
//                 setIsLoading(false);
//             });
//     }, [currentPage, perPage]);

//     const handleObserver = (entities) => {
//         const target = entities[0];
//         if (target.isIntersecting && !isLoading) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const handleDelete = (id) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this camera?');
//         if (confirmDelete) {
//             axios.delete(`http://localhost:3000/cameras/${id}`)
//                 .then(res => {
//                     // Filter out the deleted camera from the state
//                     setCameras(prevCameras => prevCameras.filter(camera => camera.cameraId !== id));
//                 })
//                 .catch(err => console.log(err));
//         }
//     };

//     return (
//         <div className="d-flex flex-column justify-content-center align-items-center vh-100">
//             <h1>Camera list</h1>
//             <div className="w-75 rounded border shadow p-4">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                     <Link to={"/stats"} className="btn btn-outline-dark mt-3">Statistics</Link>
//                     <Link to="/create" className='btn btn-light'>Add +</Link>
//                 </div>
//                 <div
//                     ref={containerRef}
//                     style={{ height: "300px", overflowY: "auto" }} // Fixed height with scrolling
//                 >
//                     <table className="table table-hover">
//                         <thead>
//                             <tr>
//                                 <th>Camera name</th>
//                                 <th>Camera price</th>
//                                 <th>Camera description</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cameras.map(camera => (
//                                 <tr key={camera.cameraId}>
//                                     <td>{camera.cameraName}</td>
//                                     <td>{camera.cameraPrice}</td>
//                                     <td>{camera.cameraDescription}</td>
//                                     <td>
//                                         <div className="btn-group btn-group-sm" role="group" aria-label="Camera Actions">
//                                             <Link to={`/update/${camera.cameraId}`} className="btn btn-primary">Edit</Link>
//                                             <Link to={`/read/${camera.cameraId}`} className="btn btn-dark">Info</Link>
//                                             <button onClick={() => handleDelete(camera.cameraId)} className="btn btn-danger">Delete</button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     {isLoading && <h5>Loading...</h5>}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
    const [cameras, setCameras] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMoreData = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (page !== 1) {
            fetchMore();
        }
    }, [page]);

    const fetchData = () => {
        axios.get(`http://localhost:3000/cameras?page=1`)
            .then(res => {
                console.log("Cameras Retrieved:");
                console.log(res.data);
                setCameras(res.data);
            })
            .catch(err => console.log(err));
    };

    const fetchMore = () => {
        axios.get(`http://localhost:3000/cameras?page=${page}`)
            .then(res => {
                console.log("More Cameras Retrieved:");
                console.log(res.data);
                if (res.data.length === 0) {
                    setHasMore(false);
                }
                setCameras(prevCameras => [...prevCameras, ...res.data]);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this camera?');
        if (confirmDelete) {
            axios.delete(`http://localhost:3000/cameras/${id}`)
                .then(() => {
                    // Filter out the deleted camera from the state
                    setCameras(prevCameras => prevCameras.filter(camera => camera.cameraId !== id));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container mt-4"> {/* Encapsulating div */}
            <h1>Camera list</h1>
            <div className="w-100 rounded border shadow p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to={"/stats"} className="btn btn-outline-dark mt-3">Statistics</Link>
                    <Link to="/create" className='btn btn-light'>Add +</Link>
                </div>
                <InfiniteScroll
                    dataLength={cameras.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Camera name</th>
                                <th>Camera price</th>
                                <th>Camera description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cameras.map(camera => (
                                <tr key={camera.cameraId}>
                                    <td>{camera.cameraName}</td>
                                    <td>{camera.cameraPrice}</td>
                                    <td>{camera.cameraDescription}</td>
                                    <td>
                                        <div className="btn-group btn-group-sm" role="group" aria-label="Camera Actions">
                                            <Link to={`/update/${camera.cameraId}`} className="btn btn-primary">Edit</Link>
                                            <Link to={`/read/${camera.cameraId}`} className="btn btn-dark">Info</Link>
                                            <button onClick={() => handleDelete(camera.cameraId)} className="btn btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Home;
