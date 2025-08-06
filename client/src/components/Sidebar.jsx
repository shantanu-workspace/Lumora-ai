import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users, LogOut } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: "/ai", label: 'Dashboard', Icon: House },
    { to: "/ai/write-article", label: 'Write Article', Icon: SquarePen },
    { to: "/ai/blog-titles", label: 'Blog Titles', Icon: Hash },
    { to: "/ai/generate-images", label: 'Generate Images', Icon: Image },
    { to: "/ai/remove-background", label: 'Remove Background', Icon: Eraser },
    { to: "/ai/remove-object", label: 'Remove Object', Icon: Scissors },
    { to: "/ai/review-resume", label: 'Review Resume', Icon: FileText },
    { to: "/ai/community", label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    // On mobile, close sidebar after a link is clicked
    const handleLinkClick = () => {
        if (window.innerWidth < 768) { // md breakpoint
            setSidebar(false);
        }
    };

    return (
        <div
            className={`w-60 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out
      ${sidebar ? 'translate-x-0' : '-translate-x-full'} 
      md:translate-x-0 md:relative absolute top-0 bottom-0 z-20`}
        >
            {/* 1. User Info Section (Stays at the top) */}
            <div className="p-4 text-center border-b border-gray-200">
                <img
                    src={user.imageUrl}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mx-auto cursor-pointer"
                    onClick={() => openUserProfile()}
                />
                <h1 className="mt-2 font-semibold text-gray-800">{user.fullName}</h1>
            </div>

            {/* 2. Navigation Links (This section will now grow) */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navItems.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/ai"}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 
              ${isActive ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white shadow" : "text-gray-600 hover:bg-gray-100"}`
                        }
                    >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* --- NEW: Profile Footer Section --- */}
            <div className="p-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    {/* User Info */}
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => openUserProfile()}
                    >
                        <img src={user.imageUrl} alt="User Avatar" className="w-9 h-9 rounded-full" />
                        <div>
                            <h3 className="text-sm font-semibold leading-tight">{user.fullName}</h3>
                            <p className='text-xs text-gray-500'>
                                <Protect plan='premium' fallback='Free'>Premium</Protect> Plan
                            </p>
                        </div>
                    </div>
                    {/* Logout Button */}
                    <button
                        onClick={() => signOut()}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        title="Sign Out"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div>

            </div>
        </div>
    );
};

export default Sidebar;
