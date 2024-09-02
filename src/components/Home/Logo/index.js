
import { useEffect, useRef, Suspense } from 'react';
import LogoS from '../../../assets/images/logo-s.png';
import './index.scss';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei';
import HeroPage from './HeroPage';
import * as THREE from 'three';
import Model from './Models/laptop';

const Logo = () => {
    const bgRef = useRef();
    const outlineLogoRef = useRef();
    const solidLogoRef = useRef();

    const adjustLaptopForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }

        return [screenScale, screenPosition];
    };

    const [isLaptopScale, isLaptopPosition] = adjustLaptopForScreenSize();

    // Initialize styles without GSAP
    useEffect(() => {
        if (bgRef.current) {
            bgRef.current.style.opacity = '1';
        }
        if (outlineLogoRef.current) {
            // You might want to initialize this in a different way if you plan to animate or change later
            outlineLogoRef.current.style.strokeDasharray = '100%';
            outlineLogoRef.current.style.strokeDashoffset = '0';
        }
        if (solidLogoRef.current) {
            solidLogoRef.current.style.opacity = '1';
        }
    }, []); // Empty dependency array means this runs once after mount

    return (
        <div className="logo-container" ref={bgRef}>
            <Canvas>
                <directionalLight position={[3, 4, 2]} intensity={5} />
                <ambientLight intensity={0.5} />
                <hemisphereLight groundColor="white" intensity={1} />
                <Model position={isLaptopPosition} scale={isLaptopScale} />
                <OrbitControls maxPolarAngle={Math.PI / 2.5} />
            </Canvas>
        </div>
    );
};

export default Logo;
