// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Create from './Create.jsx'
import Update from './Update.jsx'
import Read from './Read.jsx'
import Login from './Login.jsx'
import RegisterPage from './Register.jsx'
import Dashboard from './Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import Statistics from './Statistics.jsx'
import ConnectionStatus from './ConnectionStatus.jsx'

function App() {
  return (
    <BrowserRouter>
     <ConnectionStatus />
      <Routes>
        <Route path = '/login' element={<Login/>} />
        <Route path = '/register' element={<RegisterPage/>} />
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<Create />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/read/:id' element={<Read />} />
        <Route path='/stats' element={<Statistics />} />
        <Route path='/dashboard' element = {<Dashboard></Dashboard>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
