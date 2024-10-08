import React from 'react'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate()
    function handleLogout(event){
    event.preventDefault()
    navigate('/login')
    }
  return (
    <div className='flex mx-auto justify-between bg-indigo-800 w-full h-14 items-center text-white'>
   <h1 className='text-2xl font-bold'>Books</h1>
   <button onClick={handleLogout} className='border p-2 rounded-md hover:bg-sky-400'>Log out</button>
    </div>
  )
}

export default Navbar