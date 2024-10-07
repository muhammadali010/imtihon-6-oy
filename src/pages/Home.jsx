import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPages, setMinPages] = useState(''); 
    const [maxPages, setMaxPages] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = () => {
            setLoading(true);
            axios.get('https://fn27.vimlc.uz/books',{
        })
                .then(response => {
                    const allBooks = response.data.map(({ id, title, pageCount, thumbnailUrl, authors }) => ({
                        id:id,
                        title:title,
                        pageCount:pageCount,
                        thumbnailUrl:thumbnailUrl,
                        authors:authors,
                    }));
                    setBooks(allBooks);
                })
                .catch(error => console.error('Error fetching data:', error))
                .finally(() => setLoading(false));
        };

        fetchBooks();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
            setLoading(true);
            axios.get(`https://fn27.vimlc.uz/books/search?query=${query}`)
                .then(response => {
                    const searchResults = response.data.map(({ id, title, pageCount, thumbnailUrl, authors }) => ({
                        id:id,
                        title:title,
                        pageCount:pageCount,
                        thumbnailUrl:thumbnailUrl,
                        authors:authors,
                    }));
                    setBooks(searchResults);
                })
                .catch(error => console.error('Error fetching search results:', error))
                .finally(() => setLoading(false));
        } else {
            fetchBooks();
        }
    };

    const handleFilter = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.get(`https://fn27.vimlc.uz/books/filter?minPages=${minPages}&maxPages=${maxPages}`)
            .then(response => {
                const filteredBooks = response.data.map(({ id, title, pageCount, thumbnailUrl, authors }) => ({
                    id:id,
                    title:title,
                    pageCount:pageCount,
                    thumbnailUrl:thumbnailUrl,
                    authors:authors,
                }));
                setBooks(filteredBooks);
            })
            .catch(error => console.error('Error fetching filtered books:', error))
            .finally(() => setLoading(false));
    };

    const handleBookClick = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div>
            <Navbar />
            <form className="flex justify-between items-center mt-7" onSubmit={handleFilter}>
                <div>
                    <input className="border ml-5 p-2 rounded-md" type="text" placeholder="Qidiruv..." value={searchQuery} onChange={handleSearchChange} />
                </div>
                <div>
                    <input  className="border mr-5 p-2 rounded-md"  type="number"  placeholder="minPages" value={minPages}  onChange={(e) => setMinPages(e.target.value)} />
                    <input className="border mr-5 p-2 rounded-md" type="number" placeholder="maxPages" value={maxPages} onChange={(e) => setMaxPages(e.target.value)} />
                    <button type="submit" className="border-blue-800 bg-blue-700 py-3 px-5 rounded-md mr-5">Filter</button>
                </div>
            </form>
            <div className="mt-10">
                {loading ? (
                    <p className='text-center'>Loading...</p>
                ) : (
                    books.length > 0 ? (
                        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-center">
                            {books.map((book) => (
                                <li key={book.id} onClick={() => handleBookClick(book.id)} className="border p-6 mb-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 bg-white cursor-pointer" >
                                    <img src={book.thumbnailUrl}  alt={book.title}  className="w-full h-72 object-cover rounded-md mb-4 shadow-inner transition-opacity duration-300 hover:opacity-90" />
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{book.title}</h3>
                                        <p className="text-gray-600">Authors: {book.authors.join}</p>
                                        <p className="text-gray-500 mt-1">Pages: {book.pageCount}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-center'>Kitoblar yoq</p>
                    )
                )}
            </div>
        </div>
    );
}

export default Home;
