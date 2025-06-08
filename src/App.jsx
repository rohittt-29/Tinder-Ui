import React from 'react'

import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/body';
import Login from './components/Login';
import Profile from './components/Profile';
const App = () => {
  return (
<>
<BrowserRouter basename='/'>
<Routes>
<Route path='/' element= {<Body/>}>
<Route path='/login' element={<Login/>}/>
<Route path='/profile' element={<Profile/>}/>
</Route>
</Routes>
</BrowserRouter>


{/* <Navbar/> */}
</>
  )
}

export default App
