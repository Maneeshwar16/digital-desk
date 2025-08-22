import React from 'react';
import { FaTasks } from 'react-icons/fa';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoIosDoneAll } from "react-icons/io";
import { motion } from "framer-motion";

// --- NEW, SMARTER HELPER FUNCTIONS ---

// Checks specifically for YouTube URLs
const isYouTubeUrl = (url = '') => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
};

// Checks if a URL points to a common image file
const isImageUrl = (url = '') => {
  return /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/.test(url.toLowerCase());
};

// A general check for any web link
const isWebLink = (url = '') => {
  return url.startsWith('http') || url.startsWith('www.');
};

// Ensures a URL is properly formatted for an <a> tag
const ensureUrlProtocol = (url) => {
  if (url.startsWith('www.')) {
    return `https://${url}`;
  }
  return url;
};


const Card = ({ data, onAdd, onDelete, onMarkDone, reference, highlight }) => {
  const handleDoneClick = () => {
    onMarkDone(data._id);
  };

  // This function decides what to render based on the content itself
  const renderCardContent = () => {
    const description = data.taskDescription || '';

    // Priority 1: Check if it's a YouTube URL
    if (isYouTubeUrl(description)) {
      return (
        <a 
          href={ensureUrlProtocol(description)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline text-sm mb-6 block break-words cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {description}
        </a>
      );
    }

    // Priority 2: Check if it's an Image URL
    if (isImageUrl(description)) {
      return (
        <div className="mb-6">
          <img 
            src={description} 
            alt={data.taskName}
            className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
            onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Image+Error'}
          />
        </div>
      );
    }
    
    // Priority 3: Check if it's a generic web link (for articles)
    if (isWebLink(description)) {
        return (
            <a 
              href={ensureUrlProtocol(description)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline text-sm mb-6 block break-words cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {description}
            </a>
          );
    }

    // Default: Render as plain text
    return (
      <p className="text-white text-sm mb-6 break-words">{description}</p>
    );
  };

  return (
    <motion.div
      data-type={data.type}
      initial={highlight ? { scale: 1.2, boxShadow: '0 0 0 4px #facc15' } : { scale: 1, boxShadow: '0 0 0 0px #facc15' }}
      animate={highlight ? { scale: [1.2, 1], boxShadow: ['0 0 0 4px #facc15', '0 0 0 0px #facc15'] } : {}}
      transition={highlight ? { duration: 0.6, ease: 'easeOut' } : { type: 'spring', stiffness: 400, damping: 20, duration: 0.15 }}
      whileHover={{ scale: 1.08 }}
      drag
      dragConstraints={reference}
      className={`relative w-60 h-80 bg-zinc-900 rounded-[10%] px-5 py-10 overflow-hidden justify-center text-white mt-24 opacity-80 ${highlight ? 'ring-4 ring-yellow-400' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <FaTasks className="text-[25px]" />
        <motion.button onClick={onAdd} whileHover={{ scale: 2 }}>
          <IoIosAddCircle className="text-4xl" />
        </motion.button>
      </div>
      <p className="text-white text-xl font-bold mb-3">{data.taskName}</p>
      
      {/* Use the new smart rendering function */}
      {renderCardContent()}

      <div className="footer absolute bottom-0 w-full left-0">
        <div className="tag w-full py-4 bg-blue-600 flex items-center justify-center text-white space-x-10">
          <motion.button
           whileTap={{ scale: 0.9, rotate: 4 }}
           whileHover={{ scale: 1.5 }}
            onClick={handleDoneClick}
            className="h-10 w-10 flex justify-center items-center"
          >
            {data.done ? <IoCheckmarkDoneCircleSharp className="text-5xl text-green-500" /> : <IoIosDoneAll className="text-5xl text-white" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 1.5 }}
            whileHover={{ scale: 1.5 }}
            onClick={() => onDelete(data._id)}
            className="h-10 w-10 flex justify-center items-center"
          >
            {data.done ? <MdDeleteForever className="text-5xl text-red-500" /> : <MdDeleteForever className="text-5xl text-white" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;