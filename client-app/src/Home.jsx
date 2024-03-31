/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useEffect, useState } from "react"
// import { Link } from "react-router-dom";

// function Home() {
//     const [data, setData] = useState([]);
//     const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order is ascending

//     useEffect(() => {
//         axios.get('http://localhost:3000/cameras')
//             .then(res => setData(res.data))
//             .catch(err => console.log(err));
//     }, []);

//     const handleDelete = (id) => {
//         const confirm = window.confirm('Are you sure you want to delete this camera?');
//         if (confirm) {
//             axios.delete('http://localhost:3000/cameras/' + id)
//                 .then(res => {
//                     window.location.reload();
//                 })
//                 .catch(err => console.log(err));
//         }
//     }

//     const handleSort = () => {
//         const sortedData = [...data];
//         if (sortOrder === 'asc') {
//             sortedData.sort((a, b) => a.price - b.price);
//             setSortOrder('desc');
//         } else {
//             sortedData.sort((a, b) => b.price - a.price);
//             setSortOrder('asc');
//         }
//         setData(sortedData);
//     }

//     return (
//         <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
//             <h1>Camera list</h1>
//             <div className="w-75 rounded bg-white border shadow p-4">
//                 <div className="d-flex justify-content-end mb-3">
//                     <Link to="/create" className='btn btn-light'>Add +</Link>
//                 </div>
//                 <table className="table table-hover">
//                     <thead>
//                         <tr>
//                             <th>Camera name</th>
//                             <th>
//                             <div className="d-flex justify-content-between align-items-center">
//                                     Camera price
//                                     <button type="button" className="btn btn-link" onClick={handleSort}>
//                                         {sortOrder === 'asc' ? '↓' : '↑'}
//                                     </button>
//                                 </div>
//                             </th>
//                             <th>Camera description</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             data.map(camera => (
//                                 <tr key={camera.id}>
//                                     <td>{camera.name}</td>
//                                     <td>{camera.price}</td>
//                                     <td>{camera.description}</td>
//                                     <td>
//                                         <div className="btn-group btn-group-sm" role="group" aria-label="Camera Actions">
//                                             <Link to={`/update/${camera.id}`} className="btn btn-primary">Edit</Link>
//                                             <Link to={`/read/${camera.id}`} className="btn btn-dark">Info</Link>
//                                             <button onClick={e => handleDelete(camera.id)} className="btn btn-danger">Delete</button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//                 <Link to={"/stats"} className="btn btn-outline-dark">Statistics</Link>
//             </div>
//         </div>
//     );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [cameras, setCameras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5); // Number of items per page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    useEffect(() => {
        // Calculate the starting index based on current page and items per page
        const startIndex = (currentPage - 1) * perPage;
        
        axios.get(`http://localhost:4000/cameras`)
            .then(res => {
                const totalItems = res.data.length;
                const totalPages = Math.ceil(totalItems / perPage);
                setTotalPages(totalPages);
                // Fetch cameras for the current page
                return axios.get(`http://localhost:4000/cameras?_start=${startIndex}&_limit=${perPage}`);
            })
            .then(res => setCameras(res.data))
            .catch(err => console.log(err));
    }, [currentPage, perPage]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this camera?');
        if (confirmDelete) {
            axios.delete(`http://localhost:4000/cameras/${id}`)
                .then(res => {
                    setCameras(prevCameras => prevCameras.filter(camera => camera.id !== id));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1>Camera list</h1>
            <div className="w-75 rounded border shadow p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to={"/stats"} className="btn btn-outline-dark mt-3">Statistics</Link>
                    <Link to="/create" className='btn btn-light'>Add +</Link>
                </div>
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
                            <tr key={camera.id}>
                                <td>{camera.name}</td>
                                <td>{camera.price}</td>
                                <td>{camera.description}</td>
                                <td>
                                    <div className="btn-group btn-group-sm" role="group" aria-label="Camera Actions">
                                        <Link to={`/update/${camera.id}`} className="btn btn-primary">Edit</Link>
                                        <Link to={`/read/${camera.id}`} className="btn btn-dark">Info</Link>
                                        <button onClick={() => handleDelete(camera.id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button 
                        className="btn btn-outline-dark"
                        onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} // Prevent going below page 1
                    >
                        Previous
                    </button>
                    <span className="mx-3">{currentPage} of {totalPages}</span>
                    <button 
                        className="btn btn-outline-dark"
                        onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))} // Prevent going above total pages
                    >
                        Next     
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
