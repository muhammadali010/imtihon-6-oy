import React from 'react'
import {Route ,Routes} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Details from './pages/Details'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/details/:id' element={<Details></Details>}></Route>
    </Routes>
    </>
  )
}

export default App