import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    const location = useLocation();
    const hideFooter = location.pathname.startsWith('/chat');
  return (
    <div>
      <Navbar/>
      <Outlet/>
      {!hideFooter && <Footer/>}
    </div>
  )
}

export default Layout
