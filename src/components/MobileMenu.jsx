import React from 'react';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';

export default function MobileMenu() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 md:hidden">
            <div className="glass-panel rounded-2xl flex justify-around items-center p-4">
                <NavIcon icon={<Home size={24} />} active />
                <NavIcon icon={<ShoppingBag size={24} />} />
                <NavIcon icon={<Heart size={24} />} />
                <NavIcon icon={<User size={24} />} />
            </div>
        </div>
    );
}

function NavIcon({ icon, active }) {
    return (
        <button className={`p-2 rounded-full transition-all duration-300 ${active ? 'bg-red-500/20 text-[#ff0055]' : 'text-gray-400 hover:text-white'}`}>
            {icon}
        </button>
    );
}
