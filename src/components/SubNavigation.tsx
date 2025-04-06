import { Link, useLocation } from "react-router";
import { useState } from "react";

const SubNavigation = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return location.pathname === path ? "text-white font-bold" : "";
    };

    return (
        <nav className="w-full border-b border-[#191937] bg-[#070720] text-white py-3 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/hok" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                        <span className="text-white">HOK</span> Draft
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-300 hover:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-6 text-[#8c8ea7] font-medium">
                    <Link to="/hok/hero-list" className={`hover:text-white transition-colors ${isActive("/hok/hero-list")}`}>
                        Hero List
                    </Link>
                    <Link to="/hok" className={`hover:text-white transition-colors ${isActive("/hok")}`}>
                        Draft Pick
                    </Link>
                    <Link to="/hok/tier-maker" className={`hover:text-white transition-colors ${isActive("/hok/tier-maker")}`}>
                        Tier List Maker
                    </Link>
                </div>

                {/* Login Button */}
                <div className="hidden md:block space-x-4">
                    <button className="bg-indigo-950 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-sm transition-colors">
                        Login
                    </button>
                    <button className="bg-green-950 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-sm transition-colors">
                        Register
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 pb-2 flex flex-col gap-3 text-[#8c8ea7] font-medium">
                    <Link
                        to="/hok/hero-list"
                        className={`hover:text-white py-2 ${isActive("/hok/hero-list")}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Hero List
                    </Link>
                    <Link
                        to="/hok"
                        className={`hover:text-white py-2 ${isActive("/hok")}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Draft Pick
                    </Link>
                    <Link
                        to="/hok/tier-maker"
                        className={`hover:text-white py-2 ${isActive("/hok/tier-maker")}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Tier List Maker
                    </Link>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors mt-2 w-full text-center">
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default SubNavigation;
