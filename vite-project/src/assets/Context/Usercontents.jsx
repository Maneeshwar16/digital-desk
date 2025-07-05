import React, { createContext } from 'react'
export const DataContext = createContext()
const Usercontents = () => {
    const username = "Ram"
  return (
    <div>
      <DataContext.Provider/>
    </div>
  )
}

export default Usercontents
