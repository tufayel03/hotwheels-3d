import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
            <div className="glass-panel rounded-full max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold italic tracking-tighter" style={{ color: '#ff0055' }}>HOT WHEELS</span>
                </div>

                <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">COLLECTIONS</a>
                    <a href="#" className="hover:text-white transition-colors">NEW ARRIVALS</a>
                    <a href="#" className="hover:text-white transition-colors">TRACK SETS</a>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                        <ShoppingCart size={20} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-[#ff0055] rounded-full"></span>
                    </button>
                    <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
