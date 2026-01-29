import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ title, price, image, category }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass-panel rounded-2xl p-4 flex flex-col gap-4 group cursor-pointer relative overflow-hidden"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0055] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

            <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="w-[90%] h-[90%] object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 bg-[#ff0055] text-white text-[10px] uppercase font-black tracking-wider px-2 py-1 rounded-sm shadow-[0_0_10px_#ff0055]">
                    New
                </div>
            </div>

            <div className="relative z-10">
                <div className="text-[10px] uppercase tracking-widest text-[#00eeff] mb-1 font-bold">{category}</div>
                <h3 className="font-bold text-xl leading-none mb-3 text-white tracking-wide">{title}</h3>
                <div className="flex justify-between items-end border-t border-white/10 pt-3">
                    <span className="text-white font-mono text-lg">${price}</span>
                    <button className="text-xs uppercase font-bold tracking-wider hover:text-[#ff0055] transition-colors flex items-center gap-1">
                        Add to Garage
                        <span className="text-lg">→</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
