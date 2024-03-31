// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Create from './Create.jsx'
import Update from './Update.jsx'
import Read from './Read.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Statistics from './Statistics.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<Create />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/read/:id' element={<Read />} />
        <Route path='/stats' element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
