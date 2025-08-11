import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className='bg-[#3a3a3a] min-h-screen text-[#FFFFFF] '>
      <Navbar />
      <div className='container mx-auto px-2 md:px-0'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout