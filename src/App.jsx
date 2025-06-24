import React from 'react'

import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';
import Chat from './components/Chat';
import Layout from './components/Layout';
const App = () => {
  return (
<>
<Provider store={appStore}>
<BrowserRouter basename='/'>
<Routes>

<Route path='/' element= {<Layout/>}>
<Route path='/' element={<Feed/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/connections' element={<Connections/>}/>
<Route path='/requests' element={<Requests/>}/>
<Route path='chat/:TargetUserId' element={<Chat/>}/>
</Route>
</Routes>
</BrowserRouter>


{/* <Navbar/> */}
</Provider>
</>
  )
}

export default App
