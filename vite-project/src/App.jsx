import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './assets/Background';
import Login from './assets/Login';
import Foreground from './assets/Foreground';
import UsernameCard from './assets/UsernameCard';

const App = () => {
  return (
    <div className="relative w-full h-screen bg-zinc-800">
      {/* Routes */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/foreground" element={<Foreground />} />
        </Routes>
      </Router>
      <Background/>
    </div>
  );
};

export default App;
