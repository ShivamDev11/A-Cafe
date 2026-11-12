"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

type CoffeeSceneProps = { className?: string }

function useReducedMotion() {
  const prefersReducedMotion = useRef(false)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => { prefersReducedMotion.current = media.matches }
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])
  return prefersReducedMotion
}

function CupAsset({ onLoaded }: { onLoaded: () => void }) {
  const gltf = useLoader(GLTFLoader, "/espresso-cup.glb")
  const cupRef = useRef<THREE.Group>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => onLoaded(), [onLoaded])

  useFrame(({ pointer, camera, clock }, delta) => {
    if (prefersReducedMotion.current) return
    if (cupRef.current) {
      cupRef.current.rotation.y = clock.elapsedTime * 0.16 + pointer.x * 0.18
      cupRef.current.rotation.x += (-pointer.y * 0.1 - cupRef.current.rotation.x) * delta * 0.4
      cupRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.045
    }
    camera.position.x += (pointer.x * 0.2 - camera.position.x) * delta * 0.35
    camera.position.y += (1.15 + pointer.y * 0.12 - camera.position.y) * delta * 0.35
    camera.lookAt(0, 0, 0)
  })

  return <primitive ref={cupRef} object={gltf.scene} scale={0.88} position={[-0.16, -0.04, 0]} rotation={[0, 0.28, 0]} />
}

function CoffeeBean({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
  const groove = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.16, 0.055),
      new THREE.Vector3(-0.06, -0.06, 0.074),
      new THREE.Vector3(0.055, 0.04, 0.074),
      new THREE.Vector3(0, 0.16, 0.055),
    ])
    return new THREE.TubeGeometry(curve, 16, 0.009, 5, false)
  }, [])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh scale={[0.105, 0.17, 0.068]}>
        <sphereGeometry args={[1, 24, 20]} />
        <meshStandardMaterial color="#5e351e" roughness={0.42} />
      </mesh>
      <mesh geometry={groove}>
        <meshStandardMaterial color="#1d100a" roughness={0.65} />
      </mesh>
    </group>
  )
}

function SteamWisp({ offset, height, delay }: { offset: number; height: number; delay: number }) {
  const wisp = useRef<THREE.Group>(null)
  const prefersReducedMotion = useReducedMotion()
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(offset, 0.62, 0.02),
      new THREE.Vector3(offset - 0.1, 0.92, 0),
      new THREE.Vector3(offset + 0.12, 1.2, -0.02),
      new THREE.Vector3(offset - 0.08, 1.52, -0.04),
      new THREE.Vector3(offset + 0.1, height, -0.06),
    ])
    return new THREE.TubeGeometry(curve, 40, 0.012, 7, false)
  }, [height, offset])

  useFrame(({ clock }) => {
    if (prefersReducedMotion.current || !wisp.current) return
    const time = clock.elapsedTime + delay
    wisp.current.position.x = Math.sin(time * 0.7) * 0.045
    wisp.current.rotation.z = Math.sin(time * 0.4) * 0.04
    wisp.current.scale.y = 0.92 + Math.sin(time * 0.8) * 0.08
  })

  return (
    <group ref={wisp}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#f5dfbd" transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  )
}

function Atmosphere() {
  const pointsRef = useRef<THREE.Points>(null)
  const prefersReducedMotion = useReducedMotion()
  const positions = useMemo(() => {
    const points = new Float32Array(90 * 3)
    for (let index = 0; index < 90; index++) {
      points[index * 3] = (Math.random() - 0.5) * 5.5
      points[index * 3 + 1] = (Math.random() - 0.5) * 4.8
      points[index * 3 + 2] = (Math.random() - 0.5) * 2.5
    }
    return points
  }, [])

  useFrame((_, delta) => {
    if (!prefersReducedMotion.current && pointsRef.current) pointsRef.current.rotation.y += delta * 0.008
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#d9b779" size={0.018} transparent opacity={0.58} sizeAttenuation depthWrite={false} />
      </points>
      <CoffeeBean position={[-1.65, 0.45, 0.1]} rotation={[0.35, 0.3, 0.75]} scale={0.8} />
      <CoffeeBean position={[1.65, -0.75, 0.5]} rotation={[-0.4, 0.7, -0.55]} scale={0.72} />
      <CoffeeBean position={[1.28, 1.1, -0.4]} rotation={[0.6, -0.25, 0.3]} scale={0.58} />
      <SteamWisp offset={-0.12} height={2.1} delay={0} />
      <SteamWisp offset={0.08} height={2.3} delay={1.3} />
      <SteamWisp offset={0.28} height={1.9} delay={2.1} />
    </>
  )
}

export function CoffeeScene({ className = "" }: CoffeeSceneProps) {
  const [modelLoaded, setModelLoaded] = useState(false)
  const markModelLoaded = useMemo(() => () => setModelLoaded(true), [])

  return (
    <div className={`coffee-scene ${className} ${modelLoaded ? "coffee-scene--ready" : ""}`} aria-hidden="true">
      <div className="coffee-scene__fallback" />
      <Canvas
        camera={{ position: [0, 1.15, 6.2], fov: 34 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        fallback={<div className="coffee-scene__fallback" />}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[-3, 4, 3]} intensity={3.4} color="#ffdfa8" />
        <pointLight position={[3.5, 1, 2]} intensity={1.7} color="#d99a43" />
        <pointLight position={[-2.8, -1, -2]} intensity={1.1} color="#7c391c" />
        <Suspense fallback={null}>
          <CupAsset onLoaded={markModelLoaded} />
        </Suspense>
        <Atmosphere />
      </Canvas>
    </div>
  )
}
