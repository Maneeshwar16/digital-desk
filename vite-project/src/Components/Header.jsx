import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-8 py-6 bg-orange-600 text-slate-100 shadow-lg flex justify-between items-center rounded-ee-3xl rounded-es-3xl overflow-visible z-50%">
      {/* Logo or Title */}
      <h1 className="text-3xl font-bold tracking-wide">Maneeshwar</h1>

      {/* Navigation Links */}
      <nav className="flex space-x-8 text-lg">
        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
          <Link to="/" className="hover:text-white transition inline-block">
            Home
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
          <Link to="/about" className="hover:text-white transition inline-block">
            About
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
          <Link to="/contact" className="hover:text-white transition inline-block">
            Contact
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
          <Link to="/foreground" className="hover:text-white transition inline-block">
            Todo
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
          <Link to="/saved" className="hover:text-white transition inline-block">
            Saved Links
          </Link>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
