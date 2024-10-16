import React from 'react';
import { MessageSquare } from 'lucide-react';
import { IoIosSearch } from "react-icons/io";

const NavbarforHomepage = () => (
    <nav className="flex justify-between items-center p-2 bg-white border-b fixed top-0 left-0 right-0 z-10">
        <div className="flex space-x-4">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <div className="text-2xl font-semibold text-purple-600 mb-="><a href="#">eventbrite &emsp; </a> 
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <form className="w-[400px] relative">
                        <div className="relative">
                          <input type="Search" placeholder="Search Event" className="w-full p-4 rounded-full bg-white border-2 border-slate-150" />
                            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-purple-600 rounded-full "> <IoIosSearch /> </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>



        <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700">Find Events</a>
            <a href="#" className="text-gray-700">Find my tickets</a>
            <a href="#" className="text-gray-700">Log In</a>
            <a href="#" className="text-gray-700">Sign up</a>
            
        </div>
    </nav>
);

export default NavbarforHomepage;