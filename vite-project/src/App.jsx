import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Background from './assets/Background';
import Login from './assets/Login';
import Foreground from './assets/Foreground';
import About from './assets/About';
import Contact from './assets/Contact';
import Landing from './assets/Landing';
import { AuthProvider } from './context/AuthContext';

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/foreground" element={<Foreground />} />
      </Routes>
      {location.pathname === '/foreground' && <Background />}
    </>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <div className="relative w-full h-screen bg-zinc-800">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
