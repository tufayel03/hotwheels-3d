import React from 'react';
import ProductCard from '../components/ProductCard';

const PRODUCTS = [
    { id: 1, title: 'Twin Mill III', price: 9.99, category: 'Legends', image: 'https://static.wikia.nocookie.net/hotwheels/images/8/88/Twin_Mill_III_red.jpg' },
    { id: 2, title: 'Bone Shaker', price: 12.99, category: 'Originals', image: 'https://static.wikia.nocookie.net/hotwheels/images/3/36/Bone_Shaker_2011.jpg' },
    { id: 3, title: 'Deora II', price: 14.99, category: 'Legends', image: 'https://static.wikia.nocookie.net/hotwheels/images/e/e6/Deora_II_blue.jpg' },
    { id: 4, title: 'Rodger Dodger', price: 11.99, category: 'Muscle', image: 'https://static.wikia.nocookie.net/hotwheels/images/b/b3/Rodger_Dodger_purple.jpg' },
    { id: 5, title: 'Sharkruiser', price: 8.99, category: 'Creatures', image: 'https://static.wikia.nocookie.net/hotwheels/images/4/4c/Sharkruiser_green.jpg' },
    { id: 6, title: "Pass'n Gasser", price: 10.99, category: 'Retro', image: 'https://static.wikia.nocookie.net/hotwheels/images/1/1a/Passn_Gasser_blue.jpg' },
];

import Hero3D from '../components/Hero3D';

export default function Home() {
    return (
        <main className="relative z-10">
            <Hero3D />

            <div className="pt-[100vh] pb-24 px-4 max-w-7xl mx-auto">
                <section className="mb-12 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 italic neon-text tracking-tighter" style={{ color: '#fff' }}>
                        SPEED <span className="text-[#ff0055]">REDEFINED</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">
                        Experience the thrill of the track with our exclusive collection of legendary die-cast models.
                    </p>
                </section>

                {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {PRODUCTS.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div> */}
            </div>
        </main>
    );
}
