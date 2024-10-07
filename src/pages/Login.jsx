import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();



    function handleLogin(event) {
        event.preventDefault();



        const userCredentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setIsLoading(true);
        axios.post(`https://fn27.vimlc.uz/login`, userCredentials, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.data.user.id) { 
                    navigate("/");
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                }
            })
            .catch(err => {
                console.log(err.response);      
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className='bg-cyan-950  border rounded-md mx-auto border-gray-300 shadow-md w-1/3 mt-24 p-6'>
            <h2 className='text-center  text-blue-600 text-4xl mb-5 font-extrabold py-5'>Login</h2>
            <form className='flex flex-col items-center py-5'>
                <input  ref={emailRef} className='p-3 mb-3 border rounded-md w-full bg-cyan-950 border-indigo-500'  type="email"  placeholder='Enter  email...' />
                <input  ref={passwordRef} className='p-3 mb-3 border rounded-md w-full bg-cyan-950 border-indigo-500'  type="password"  placeholder='Enter  password...' />
                <button   disabled={isLoading} onClick={handleLogin}  className='bg-blue-600 text-white w-full p-2 rounded-md hover:bg-blue-700'  >  {isLoading ? "login.." : "Login"} </button>
                <Link className='mx-auto mt-2 text-white hover:text-blue-500' to="/register">Register</Link>
            </form>
        </div>
    );
}

export default Login;
