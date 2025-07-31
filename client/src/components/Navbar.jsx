import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { assets } from '../assets/assets'

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()


    return (
        <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
            <img src={assets.logo} alt="logo_1" className='w-32 sm:w-44 cursor-pointer' onClick={() => {
                navigate("/")
            }} />

            {   //If the user is locked in then only show them the button
                user ? <UserButton /> : (
                    <button onClick={openSignIn} className="bg-[#7eb9b9] hover:bg-[#115e59] transition-colors text-black px-6 py-2 rounded-full text-sm font-medium">
                        Get Started<span className="ml-1">→</span>
                    </button>
                )
            }
        </div>
    )
}

export default Navbar