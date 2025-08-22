import React, { useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoIosDoneAll } from "react-icons/io";
import { motion } from "framer-motion";

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const Card = ({ data, onAdd, onDelete, onMarkDone, reference, highlight }) => {
  const handleDoneClick = () => {
    onMarkDone(data._id);
  };

  return (
    <motion.div
      data-type={data.type}
      initial={highlight ? { scale: 1.2, boxShadow: '0 0 0 4px #facc15' } : { scale: 1 }}
      animate={highlight ? { scale: [1.2, 1], boxShadow: ['0 0 0 4px #facc15', '0 0 0 0px #facc15'] } : { scale: 1 }}
      whileHover={{ 
        scale: 1.1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={reference}
      className={`relative w-60 h-80 bg-zinc-900 rounded-[10%] px-5 py-10 overflow-hidden justify-center text-white mt-24 opacity-80 hover:shadow-lg hover:opacity-100 transition-opacity ${highlight ? 'ring-4 ring-yellow-400' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <FaTasks className="text-[25px]" />
        <motion.button onClick={onAdd} whileHover={{ scale: 2 }}>
          <IoIosAddCircle className="text-4xl" />
        </motion.button>
      </div>
      <p className="text-white text-xl font-bold mb-3">{data.taskName}</p>
      {data.type === 'youtube' || data.type === 'article' ? (
        <>
          <p className="text-white text-sm mb-2">{data.taskName}</p>
          {isValidUrl(data.taskDescription) ? (
            <a 
              href={data.taskDescription}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline text-sm mb-6 block break-words cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {data.taskDescription.length > 50 
                ? data.taskDescription.substring(0, 50) + '...' 
                : data.taskDescription}
            </a>
          ) : (
            <p className="text-white text-sm mb-6">{data.taskDescription}</p>
          )}
        </>
      ) : data.type === 'image' ? (
        <div className="mb-6">
          <p className="text-white text-sm mb-2">{data.taskName}</p>
          <img 
            src={data.taskDescription} 
            alt={data.taskName}
            className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
            onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Image+Error'}
          />
        </div>
      ) : (
        <>
          <p className="text-white text-xl font-semibold mb-2">{data.taskName}</p>
          <p className="text-white text-sm mb-6">{data.taskDescription}</p>
        </>
      )}
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
          whileTap={{ scale: 10, rotate: 3 }}
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
