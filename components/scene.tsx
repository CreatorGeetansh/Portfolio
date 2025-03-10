"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import * as THREE from "three"

export default function Scene({ scrollY = 0 }) {
  const sceneRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Group>(null)

  // Create particles
  useEffect(() => {
    if (!particlesRef.current) return

    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 500

    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: "#8a2be2",
      transparent: true,
      opacity: 0.8,
    })

    const particleMesh = new THREE.Points(particleGeometry, particleMaterial)
    particlesRef.current.add(particleMesh)

    return () => {
      particleGeometry.dispose()
      particleMaterial.dispose()
    }
  }, [])

  // Animate scene based on scroll
  useFrame((state, delta) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = scrollY * 0.001
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05
      particlesRef.current.rotation.x += delta * 0.025
    }
  })

  return (
    <group ref={sceneRef}>
      <group ref={particlesRef} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          font="/fonts/Geist-Bold.ttf"
          fontSize={1.5}
          position={[0, 2, 0]}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          WELCOME
        </Text>
      </Float>

      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

