import React from 'react';
import { CirclePlus } from 'lucide-react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600 cursor-pointer">
                    <Link
                        to="/"
                        className="text-blue-500 hover:underline"
                    >
                        Flipzon
                    </Link>
                </div>



                {/* Cart & Profile (optional) */}
                <div className="flex items-center space-x-4">

                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
                        <Link
                            to="/createpage" >
                            <CirclePlus />
                        </Link>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
