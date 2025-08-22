import React from 'react';
import { FaTasks } from 'react-icons/fa';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoIosDoneAll } from "react-icons/io";
import { motion } from "framer-motion";

// HELPER FUNCTION: Checks if a string looks like a URL
const isUrl = (string) => {
  if (!string) return false;
  // A simple check for common URL patterns
  return string.startsWith('http://') || string.startsWith('https://') || string.startsWith('www.');
};

// HELPER FUNCTION: Ensures a URL has a protocol for the href attribute
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

  const isLink = isUrl(data.taskDescription);

  return (
    <motion.div
      data-type={data.type}
      initial={highlight ? { scale: 1.2, boxShadow: '0 0 0 4px #facc15' } : { scale: 1, boxShadow: '0 0 0 0px #facc15' }}
      animate={highlight ? { scale: [1.2, 1], boxShadow: ['0 0 0 4px #facc15', '0 0 0 0px #facc15'] } : {}}
      transition={highlight ? { duration: 0.6, ease: 'easeOut' } : { type: 'spring', stiffness: 400, damping: 20, duration: 0.15 }}
      whileHover={{ scale: 1.08 }}
      onHoverStart={event => {}}
      onHoverEnd={event => {}}
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

      {/* --- FIX IS HERE --- */}
      {(data.type?.toLowerCase() === 'youtube' || data.type?.toLowerCase() === 'article') && isLink ? (
        // If it's a link, render a clickable <a> tag
        <a 
          href={ensureUrlProtocol(data.taskDescription)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline text-sm mb-6 block break-words cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {data.taskDescription}
        </a>
      ) : data.type?.toLowerCase() === 'image' && isLink ? (
        // If it's an image, render an <img> tag
        <div className="mb-6">
          <img 
            src={data.taskDescription} 
            alt={data.taskName}
            className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
            onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Image+Error'}
          />
        </div>
      ) : (
        // Otherwise, for all other cases (including plain text articles), render a simple <p> tag
        <p className="text-white text-sm mb-6 break-words">{data.taskDescription}</p>
      )}
      {/* --- END OF FIX --- */}

      <div className="footer absolute bottom-0 w-full left-0">
        <div className="tag w-full py-4 bg-blue-600 flex items-center justify-center text-white space-x-10">
          <motion.button
           whileTap={{ scale: 0.9, rotate: 4 }}
           whileHover={{ scale: 1.5 }}
            onClick={handleDoneClick}
            className="h-10 w-10 flex justify-center items-center"
          >
            {data.done ? (
              <IoCheckmarkDoneCircleSharp className="text-5xl text-green-500" />
            ) : (
              <IoIosDoneAll className="text-5xl text-white" />
            )}
          </motion.button>
          <motion.button
          whileTap={{ scale: 1.5 }}
          whileHover={{ scale: 1.5 }}
            onClick={() => onDelete(data._id)}
            className="h-10 w-10 flex justify-center items-center"
          >
            {data.done ?(
              <MdDeleteForever className="text-5xl text-red-500" />)
              :(
                <MdDeleteForever className="text-5xl text-white" />
              )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;