import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './assets/Background';
import Login from './assets/Login';
import Foreground from './assets/Foreground';
import UsernameCard from './assets/UsernameCard';
import Header from './Components/Header';
import About from './assets/About';
import Contact from './assets/Contact';

const App = () => {
  return (
    <div className="relative w-full h-screen bg-zinc-800">
      {/* Routes */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/foreground" element={<Foreground />} />
        </Routes>
        <Background />
      </Router>
    </div>
  );
};

export default App;
