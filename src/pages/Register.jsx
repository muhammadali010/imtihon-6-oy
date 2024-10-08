import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const usernameRef = useRef();
    const surnameRef = useRef();
    const ageRef = useRef()
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
 
    function Validate(){
        if (usernameRef.current.value.length < 3) {
            alert('username 3 ta harfdan kam bolmasligi kerak')
            usernameRef.current.focus()
            usernameRef.current.style.outlineColor ='red'
            return false
        }
        return true
        }
        function Validate(){
            if (ageRef.current.value < 5) {
                alert('5 yoshdan kichiklar kirishi mumkin emas')
                ageRef.current.focus()
                ageRef.current.style.outlineColor ='red'
                return false
            }
            return true
            }

    const handleRegister = (event) => {
        event.preventDefault();
        const isvalid = Validate();
        if (!isvalid) {
          return;
        }
      

        const User = {
            firstName: usernameRef.current.value,
            lastName: surnameRef.current.value,
            age:ageRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: rePasswordRef.current.value
        };
        setLoading(true);
        axios.post('https://fn27.vimlc.uz/register', User, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => {
                if (data.data.message === "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi") {
                    navigate("/login");
                    usernameRef.current.value = '';
                    surnameRef.current.value = '';
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                    rePasswordRef.current.value = '';
                }
            })
            .catch(err => { console.log(err); })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='bg-cyan-950 border rounded-lg mx-auto border-gray-300 shadow-md w-1/3 mt-24 p-6'>
            <h2 className='text-center text-blue-600 text-4xl mb-6 font-bold'>Register</h2>
            <form className='flex flex-col'>
                <input ref={usernameRef} className='p-3 mb-4  bg-cyan-950 border-indigo-500 border-b-2 rounded-lg w-full  focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter name...' />
                <input ref={surnameRef} className='p-3 mb-4 border-b-2 rounded-lg w-full  bg-cyan-950 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter surname...' />
                <input ref={ageRef} className='p-3 mb-4 border-b-2 rounded-lg w-full  bg-cyan-950 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="number" placeholder='Enter age...' />
                <input ref={emailRef} className='p-3 mb-4 border-b-2 bg-cyan-950 border-indigo-500 rounded-lg w-full  focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" placeholder='Enter email...' />
                <input ref={passwordRef} className='p-3 mb-4 border-b-2 rounded-lg w-full  bg-cyan-950 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Create password...' />
                <input ref={rePasswordRef} className='p-3 mb-4 border-b-2 rounded-lg w-full  bg-cyan-950 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Confirm password...' />
                <button disabled={loading} onClick={handleRegister} className='bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200'>{loading ? "Registering" : "Register"}</button>
                <Link className='text-center mt-4 text-white hover:text-blue-500' to="/login">Login</Link>
            </form>
        </div>
    );
}

export default Register;
