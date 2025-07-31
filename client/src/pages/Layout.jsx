import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { assets } from '../assets/assets';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  // Sidebar is visible by default on larger screens
  const [sidebar, setSidebar] = useState(true);
  const {user} = useUser();

  return user ? (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 1. Full-width Header */}
      <header className="flex items-center justify-between w-full h-16 px-6 bg-white border-b border-gray-200 shrink-0">
        {/* Logo on the left */}
        <img
          src={assets.logo}
          alt="Lumora AI Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate('/')}   //when you will click on the logo you will go to the home page using navigate function 
        />
        {/* Hamburger Menu for mobile on the right */}
        <div onClick={() => setSidebar(!sidebar)} className="cursor-pointer md:hidden">
          {sidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
      </header>

      {/* 2. Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-[#F4F7FB]">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}; 

export default Layout;


