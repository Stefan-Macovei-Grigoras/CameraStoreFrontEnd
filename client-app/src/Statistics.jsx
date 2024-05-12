/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// function DonutChart() {
//     const [priceRangeData, setPriceRangeData] = useState({});

//     useEffect(() => {
//         axios.get('http://localhost:3000/cameras')
//             .then(res => {
//                 const data = res.data;
//                 const priceRanges = {
//                     '$0 - $499': 0,
//                     '$500 - $999': 0,
//                     '$1000+': 0
//                 };
//                 data.forEach(camera => {
//                     const price = parseInt(camera.price);
//                     if (price <= 499) {
//                         priceRanges['$0 - $499']++;
//                     } else if (price <= 999) {
//                         priceRanges['$500 - $999']++;
//                     } else {
//                         priceRanges['$1000+']++;
//                     }
//                 });
//                 setPriceRangeData(priceRanges);
//             })
//             .catch(err => console.log(err));
//     }, []);

//     useEffect(() => {
//         if (Object.keys(priceRangeData).length > 0) {
//             const ctx = document.getElementById('donutChart');
//             new Chart(ctx, {
//                 type: 'doughnut',
//                 data: {
//                     labels: Object.keys(priceRangeData),
//                     datasets: [{
//                         label: 'Price Range',
//                         data: Object.values(priceRangeData),
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.5)',
//                             'rgba(54, 162, 235, 0.5)',
//                             'rgba(255, 206, 86, 0.5)'
//                         ],
//                         hoverOffset: 4
//                     }]
//                 }
//             });
//         }
//     }, [priceRangeData]);

//     return (
//         <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-70">
//             <h2>Price Range Distribution</h2>
//             <canvas id="donutChart" width="200" height="200"></canvas>
//             <div className="col-md-12 bg-light text-right">
//                 <Link to="/" className='btn btn-primary ms-3'>Back</Link>
//             </div>
//         </div>
//     );
// }

// export default DonutChart;
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "chart.js/auto";
import { useNavigate } from 'react-router-dom';

function DonutChart() {
    const [priceRangeData, setPriceRangeData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
          // Redirect to login page if token is not available
          navigate('/login');
        }});

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:3000/cameras',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                const data = res.data;
                const priceRanges = {
                    '$0 - $499': 0,
                    '$500 - $999': 0,
                    '$1000+': 0
                };
                data.forEach(camera => {
                    const price = parseInt(camera.price);
                    if (price <= 499) {
                        priceRanges['$0 - $499']++;
                    } else if (price <= 999) {
                        priceRanges['$500 - $999']++;
                    } else {
                        priceRanges['$1000+']++;
                    }
                });
                setPriceRangeData(priceRanges);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (Object.keys(priceRangeData).length > 0) {
            const ctx = document.getElementById('donutChart');
            // Check if a Chart instance already exists on the canvas
            if (ctx && ctx.chart) {
                // Destroy the existing Chart instance
                ctx.chart.destroy();
            }
            // Render the new Chart
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(priceRangeData),
                    datasets: [{
                        label: 'Price Range',
                        data: Object.values(priceRangeData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false // Add this option to prevent the chart from maintaining aspect ratio
                }
            });
        }
    }, [priceRangeData]);
    

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-95">
            <h2>Price Range Distribution</h2>
            {Object.keys(priceRangeData).length > 0 && (
                <div style={{ width: '100%', height: '100%' }}>
                    <canvas id="donutChart"></canvas>
                </div>
            )}
            <div className="col-md-12 text-right">
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>
            </div>
        </div>
    );
}

export default DonutChart;

