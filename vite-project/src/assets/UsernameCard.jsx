  import React from 'react'
  import { motion } from "framer-motion";
  const UsernameCard = () => {
    return (
      <motion.div
      whileHover={{ scale: 1.2 }}
       className='max-w-xs h-20 bg-orange-400 rounded-2xl flex justify-start items-center inline-flex px-10 py-10   font-semibold drop-shadow-2xl text-xl opacity-70 '>
        <span className='whitespace-normal '>
          Hello <span className='underline decoration-double'>Maneeshwar</span>
        </span>
      </motion.div>
    )
  }

  export default UsernameCard
