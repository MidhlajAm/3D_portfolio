import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const PURPLE = "#7A52F4";
const PURPLE_LIGHT = "#8E6BFF";
const PURPLE_BASE = "#5636B0";

// ---------- Geometry ----------

function createStadiumShape(width, height) {
    const shape = new THREE.Shape();
    const r = height / 2;
    const halfW = width / 2;

    shape.moveTo(-halfW + r, -r);
    shape.lineTo(halfW - r, -r);
    shape.absarc(halfW - r, 0, r, -Math.PI / 2, Math.PI / 2, false);
    shape.lineTo(-halfW + r, r);
    shape.absarc(-halfW + r, 0, r, Math.PI / 2, Math.PI * 1.5, false);

    return shape;
}

function createStadiumGeometry(width, height, depth, bevel) {
    const geometry = new THREE.ExtrudeGeometry(createStadiumShape(width, height), {
        depth,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 8,
        curveSegments: 24,
    });

    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
}

function createArrowShape() {
    const shape = new THREE.Shape();

    shape.moveTo(-0.45, 0.09);
    shape.lineTo(0.05, 0.09);
    shape.lineTo(0.05, 0.28);
    shape.lineTo(0.5, 0);
    shape.lineTo(0.05, -0.28);
    shape.lineTo(0.05, -0.09);
    shape.lineTo(-0.45, -0.09);
    shape.closePath();

    return shape;
}

function createArrowGeometry(depth, bevel) {
    const geometry = new THREE.ExtrudeGeometry(createArrowShape(), {
        depth,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel * 0.6,
        bevelSegments: 4,
        curveSegments: 12,
    });

    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
}

// ---------- Sizes ----------

const WIDTH = 2.6;
const HEIGHT = 0.85;
const DEPTH = 0.32;
const BEVEL = 0.05;

const ICON_RADIUS = 0.34;
const ICON_X = WIDTH / 2 - 0.5;

// ---------- Button ----------

function GetInTouchButtonMesh({ label = "Get In Touch", onClick }) {
    const frontRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    const state = useRef({
        z: 0,
        scale: 1,
    });

    const pillGeometry = useMemo(
        () => createStadiumGeometry(WIDTH, HEIGHT, DEPTH, BEVEL),
        []
    );

    const arrowGeometry = useMemo(
        () => createArrowGeometry(0.12, 0.02),
        []
    );

    useFrame(() => {
        if (!frontRef.current) return;

        const targetZ = pressed ? -0.16 : hovered ? 0.06 : 0;
        const targetScale = pressed ? 0.97 : hovered ? 1.03 : 1;

        state.current.z = THREE.MathUtils.lerp(state.current.z, targetZ, 0.25);
        state.current.scale = THREE.MathUtils.lerp(
            state.current.scale,
            targetScale,
            0.25
        );

        frontRef.current.position.z = state.current.z;
        frontRef.current.scale.setScalar(state.current.scale);
    });

    return (
        <group>
            {/* Base */}
            <mesh
                geometry={pillGeometry}
                position={[0, -0.05, -0.22]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={PURPLE_BASE}
                    roughness={0.6}
                />
            </mesh>

            {/* Front */}
            <group
                ref={frontRef}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    setPressed(false);
                    document.body.style.cursor = "default";
                }}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    setPressed(true);
                }}
                onPointerUp={(e) => {
                    e.stopPropagation();
                    setPressed(false);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                }}
            >
                {/* Purple Button */}
                <mesh geometry={pillGeometry} castShadow receiveShadow>
                    <meshPhysicalMaterial
                        color={hovered ? PURPLE_LIGHT : PURPLE}
                        roughness={0.25}
                        metalness={0.05}
                        clearcoat={0.7}
                        clearcoatRoughness={0.15}
                    />
                </mesh>

                {/* Text */}
                <Text
                    position={[-0.72, 0, DEPTH / 2 + 0.06]}
                    fontSize={0.30}
                    color="white"
                    anchorX="right"
                    anchorY="middle"
                >
                    {label}
                </Text>

                {/* White Circle */}
                <mesh
                    position={[ICON_X, 0, DEPTH / 2 + 0.05]}
                    rotation={[Math.PI / 2, 0, 0]}
                    castShadow
                    receiveShadow
                >
                    <cylinderGeometry
                        args={[ICON_RADIUS, ICON_RADIUS, 0.1, 64]}
                    />
                    <meshPhysicalMaterial
                        color="white"
                        roughness={0.2}
                        clearcoat={0.8}
                    />
                </mesh>

                {/* Arrow */}
                <mesh
                    geometry={arrowGeometry}
                    position={[ICON_X, 0, DEPTH / 2 + 0.09]}
                    scale={0.62}
                >
                    <meshStandardMaterial
                        color={PURPLE}
                        roughness={0.3}
                    />
                </mesh>
            </group>
        </group>
    );
}

// ---------- Export ----------

export default function GetInTouchButton3D({
    onClick,
    width = 300,
    height = 96,
}) {
    return (
        <div
            style={{
                width,
                height,
            }}
        >
            <Canvas
                orthographic
                shadows
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                }}
                camera={{
                    position: [0, 0, 10],
                    zoom: 70, // Reduced so the full button fits
                    near: 0.1,
                    far: 100,
                }}
            >
                <ambientLight intensity={0.9} />

                <directionalLight
                    position={[3, 4, 6]}
                    intensity={1.4}
                    castShadow
                />

                <directionalLight
                    position={[-3, -1, 4]}
                    intensity={0.35}
                />

                <GetInTouchButtonMesh onClick={onClick} />
            </Canvas>
        </div>
    );
}