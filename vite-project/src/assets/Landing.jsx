import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTasks, FaRegFileAlt, FaYoutube, FaImage, FaUserSecret } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: <FaTasks className="text-blue-400 text-3xl" />, label: 'Tasks', desc: 'Organize your todos and reminders.', color: 'blue', type: 'task' },
  { icon: <FaRegFileAlt className="text-indigo-400 text-3xl" />, label: 'Articles', desc: 'Save important articles and links.', color: 'indigo', type: 'article' },
  { icon: <FaYoutube className="text-red-400 text-3xl" />, label: 'YouTube', desc: 'Bookmark YouTube videos.', color: 'red', type: 'youtube' },
  { icon: <FaImage className="text-green-400 text-3xl" />, label: 'Images', desc: 'Store image links for quick access.', color: 'green', type: 'image' },
  { icon: <FaUserSecret className="text-gray-300 text-3xl" />, label: 'Guest Mode', desc: 'Try the app instantly, no signup needed.', color: 'gray', type: 'guest' },
];

const colorMap = {
  blue: 'hover:bg-blue-600 hover:text-white',
  indigo: 'hover:bg-indigo-600 hover:text-white',
  red: 'hover:bg-red-600 hover:text-white',
  green: 'hover:bg-green-600 hover:text-white',
  gray: 'hover:bg-gray-700 hover:text-white',
};

const Landing = () => {
  const navigate = useNavigate();
  const dragRef = useRef(null);
  const { setUser } = useAuth();

  const handleCardClick = (type) => {
    if (type === 'guest') {
      setUser({ username: 'Guest', guest: true });
      navigate('/foreground', { state: { guest: true, focusType: 'task' } });
      return;
    }
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/foreground', { state: { focusType: type } });
    } else {
      navigate('/login', { state: { focusType: type, redirectTo: '/foreground' } });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-10">
        <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">Digital Desk</div>
        <div className="text-xl text-zinc-300 mb-4">Your all-in-one organizer for tasks, articles, videos, and images</div>
        <div className="text-md text-zinc-400 mb-6 max-w-xl mx-auto">Save, organize, and access your important information from anywhere. No more scattered notes or lost links—everything you need, in one beautiful place.</div>
        <div ref={dragRef} className="flex flex-wrap justify-center gap-6 mb-8 relative">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`flex flex-col items-center bg-zinc-900 rounded-xl p-4 w-36 shadow-md cursor-pointer transition-colors duration-300 ${colorMap[f.color]}`}
              whileHover={{ scale: 1.13, rotateY: 8, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' }}
              whileTap={{ scale: 0.98, rotateY: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ perspective: 600 }}
              onClick={() => handleCardClick(f.type)}
              drag
              dragConstraints={dragRef}
              dragElastic={0.18}
            >
              {f.icon}
              <div className="mt-2 text-white font-semibold text-lg">{f.label}</div>
              <div className="text-xs text-zinc-400 mt-1">{f.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="text-lg text-zinc-200 font-semibold mb-2 mt-6">How it works</div>
        <ol className="text-zinc-400 text-sm mb-8 max-w-lg mx-auto list-decimal list-inside text-left">
          <li>Sign up, log in, or try as guest</li>
          <li>Click the <span className="text-blue-400 font-bold">+</span> button to add tasks, articles, YouTube links, or images</li>
          <li>Organize, mark as done, or delete items as you wish</li>
          <li>Access your digital desk anytime, anywhere</li>
        </ol>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login', { state: { guest: true } })}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md transition-colors"
          >
            Try as Guest
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing; 