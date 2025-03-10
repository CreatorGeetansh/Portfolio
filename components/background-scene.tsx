"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function BackgroundScene({ scrollY = 0 }) {
  // Specify the type for useRef
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Group>(null) // Corrected type
  const textRef = useRef<THREE.Mesh>(null)

  // Create particles
  useEffect(() => {
    if (!particlesRef.current) return

    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color("#c392ec")
    const color2 = new THREE.Color("#85d5c8")

    for (let i = 0; i < particleCount; i++) {
      // Position
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 15
      positions[i3 + 1] = (Math.random() - 0.5) * 15
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      // Color - gradient between two colors
      const mixFactor = Math.random()
      const particleColor = new THREE.Color().lerpColors(color1, color2, mixFactor)
      colors[i3] = particleColor.r
      colors[i3 + 1] = particleColor.g
      colors[i3 + 2] = particleColor.b
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particlesRef.current.add(particles)

    return () => {
      particleGeometry.dispose()
      particleMaterial.dispose()
    }
  }, [])

  // Animate scene
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle rotation based on scroll
      groupRef.current.rotation.y = scrollY * 0.0005
      groupRef.current.rotation.x = scrollY * 0.0002
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05
      particlesRef.current.rotation.x += delta * 0.025
    }

    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Particles */}
      <group ref={particlesRef} />

      {/* Floating gradient plane */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50, 20, 20]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} wireframe={true} />
      </mesh>

      {/* Ambient light with gradient colors */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#c392ec" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#85d5c8" />
    </group>
  )
}

