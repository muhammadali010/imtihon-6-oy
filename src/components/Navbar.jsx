import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    function handleLogout(event) {
        event.preventDefault();
        navigate('/login');
    }

    return (
        <div className='w-full bg-indigo-800'>
            <div className='container mx-auto flex justify-between items-center text-white h-16 px-8'>
                <h1 className='text-3xl font-bold'>Books</h1>
                <div className='space-x-4'>
                    <button onClick={handleLogout} className='border px-4 py-2 rounded-md hover:bg-sky-400'>Log out</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
