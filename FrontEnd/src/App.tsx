import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Profile from './component/Profile';
import UpdateProfile from './component/UpdateProfile';
import { useState } from 'react';
import NotFound from './component/NotFound';

interface props{
  name: string
}

const App : React.FC<props> = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem('jwt'));

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setJwtToken(null);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setJwtToken={setJwtToken} />} />
        <Route
          path="/profile"
          element={jwtToken ? <Profile token={jwtToken} handleLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-profile"
          element={jwtToken ? <UpdateProfile token={jwtToken} /> : <Navigate to="/login" />}
        />
        <Route
        path="*" element={ <NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
