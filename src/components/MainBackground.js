import { Canvas, useFrame } from "@react-three/fiber"

import { useRef } from 'react';
import styled from "styled-components";
import { OrbitControls, Text } from "@react-three/drei";

function Container() {
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.y += 0.005)); // #2
    return (
        <mesh
            ref={mesh}
            scale={1}
        >
            <sphereGeometry args={[4, 128, 128]}></sphereGeometry>
            <meshBasicMaterial color="#00c1ff" />
            <Text position={[0, 0.3, 4]}>hello world!</Text>
        </mesh>
    );
}

function Three() {
    return <FullDiv>

        <Canvas 
            camera ={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 5] }}
        >
            {/* <pointLight position={[10, 0, 10]}></pointLight> */}
            <OrbitControls></OrbitControls>
            <Container></Container>
        </Canvas>

    </FullDiv>
}

const FullDiv = styled.div `
    height: 100vh;
`

export default Three