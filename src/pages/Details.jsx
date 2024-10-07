import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Details() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://fn27.vimlc.uz/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => console.error('Error fetching book details:', error))
      .finally(() => setLoading(false));
  }, [id]);
 function handleBack(event){
event.preventDefault()
navigate('/')
}
  return (
    <div>
        <Navbar/>
        <button onClick={handleBack} className='border p-2 rounded-md mt-3 ml-6 bg-slate-600'>Back To Home</button>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        book ? (
          <div className='flex mt-24 ml-7'>
            <img src={book.thumbnailUrl} alt={book.title} className="w-80 h-80 mb-3 object-cover" />
            <div className='ml-12 mt-20'>
            <h1 className="text-2xl font-bold">{book.title}</h1> 
            <p className='mt-4'>Id: {book.id}</p>
            <h2 className='mt-3'>Authors: {book.authors}</h2>
            <p className='mt-3'>Pages: {book.pageCount}</p>
            </div>
          </div>
        ) : (
          <p className='text-center'>Kitob topilmadi</p>
        )
      )}
    </div>
  );
}

export default Details;
