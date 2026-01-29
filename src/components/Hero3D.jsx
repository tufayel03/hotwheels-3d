import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, ContactShadows, Environment, Stars, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Preload to prevent stutter
useGLTF.preload('/free_1975_porsche_911_930_turbo.glb');

function Sun() {
    return (
        <group>
            {/* The Sun Mesh */}
            <mesh>
                <sphereGeometry args={[15, 32, 32]} />
                <meshStandardMaterial
                    emissive="#FFD700"
                    emissiveIntensity={2}
                    color="#FFD700"
                    roughness={0}
                />
            </mesh>
            {/* Sun Light Source */}
            <pointLight intensity={3} distance={300} decay={1} color="#FFD700" />
            <pointLight intensity={10} distance={50} decay={2} color="#FFFFFF" />
        </group>
    );
}

function SportsCar({ orbitalParams, scale = 1 }) {
    const group = useRef();
    const { scene } = useGLTF('/free_1975_porsche_911_930_turbo.glb');
    const clone = useMemo(() => scene.clone(), [scene]);

    const [hovered, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [held, setHeld] = useState(false);

    // Random offset to desync animations
    const offset = useRef(Math.random() * 100);

    useFrame((state, delta) => {
        if (!group.current) return;

        // INTERACTION LOGIC
        // Held: Stop Orbit | Hover: Slow Orbit
        const speedMult = held ? 0 : (clicked ? 5 : (hovered ? 0.2 : 1));

        // Scale effect
        const targetScale = clicked ? scale * 0.5 : (hovered || held ? scale * 1.5 : scale);
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // ORBITAL PHYSICS
        // Angle = time * speed + offset
        if (!group.current.userData.angle) group.current.userData.angle = offset.current; // Init once

        group.current.userData.angle += orbitalParams.speed * speedMult * delta;

        const angle = group.current.userData.angle;
        const r = orbitalParams.radius;

        // Calculate Position
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = orbitalParams.y + Math.sin(state.clock.elapsedTime + offset.current) * 2; // Bobbing

        group.current.position.set(x, y, z);

        // FACE FORWARD (Tangent)
        // The look target is a bit ahead in the orbit
        const lookAngle = angle + 0.1;
        const lookX = Math.cos(lookAngle) * r;
        const lookZ = Math.sin(lookAngle) * r;

        group.current.lookAt(lookX, y, lookZ);
    });

    return (
        <group ref={group}>
            {/* INVISIBLE HITBOX */}
            <mesh
                visible={false}
                position={[0, 0.5, 0]}
                onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHover(false); setHeld(false); document.body.style.cursor = 'auto'; }}
                onPointerDown={(e) => { e.stopPropagation(); setHeld(true); }}
                onPointerUp={(e) => { e.stopPropagation(); setHeld(false); }}
                onClick={(e) => { e.stopPropagation(); if (!held) setClicked(!clicked); }}
            >
                <boxGeometry args={[4, 2, 8]} />
                <meshBasicMaterial transparent opacity={0.5} color="red" />
            </mesh>

            <primitive
                object={clone}
                scale={[1, 1, 1]} // Scale handled by group
                rotation={[0, 0, 0]}
            />
        </group>
    );
}

function CarFleet() {
    const cars = useMemo(() => {
        return new Array(4).fill(0).map((_, i) => {
            // ORBIT SETTINGS
            return {
                id: i,
                orbitalParams: {
                    radius: 40 + (i * 25), // Concentric rings: 40, 65, 90...
                    speed: (0.2 + (Math.random() * 0.3)) / 5, // Reduced Speed (5x slower)
                    y: (Math.random() - 0.5) * 20 // Random height variation
                },
                scale: 2.5
            };
        });
    }, []);

    return (
        <group>
            {cars.map(car => (
                <SportsCar
                    key={car.id}
                    orbitalParams={car.orbitalParams}
                    scale={car.scale}
                />
            ))}
        </group>
    );
}

export default function Hero3D() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, background: '#050505' }}>
            {/* SOLAR HUD */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: "'Inter', sans-serif",
                zIndex: 10,
                pointerEvents: 'none',
                textShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#FFD700' }}>☀️ SOLAR SYSTEM MODE</h3>
                <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <div><b>Drag</b> - Rotate View</div>
                    <div><b>Scroll</b> - Zoom</div>
                    <div><b>Click Sun</b> - (It burns)</div>
                </div>
            </div>

            <React.Suspense fallback={<div className="text-white absolute inset-0 flex items-center justify-center text-2xl font-black tracking-widest animate-pulse">LOADING SOLAR FLEET...</div>}>
                <Canvas shadows camera={{ position: [0, 40, 100], fov: 60 }} style={{ width: '100%', height: '100%' }}>
                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 50, 300]} />

                    <ambientLight intensity={0.2} />

                    <group position={[0, 0, 0]}>
                        <Sun />
                        <CarFleet />
                    </group>

                    <Stars radius={200} depth={50} count={8000} factor={4} saturation={0} fade speed={0.5} />
                    <Environment preset="city" />

                    {/* ORBIT CONTROLS for inspection */}
                    <OrbitControls
                        enableZoom={true}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                        maxDistance={300}
                        minDistance={20}
                    />
                </Canvas>
            </React.Suspense>
        </div>
    );
}
