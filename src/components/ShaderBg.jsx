import { useEffect } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

/**
 * Slow-moving olive & gold shader gradient behind the story. Loaded
 * lazily (three.js is heavy) — the Loader plane covers the wait.
 * NOTE: use `@shadergradient/react`, NOT the old `shadergradient`
 * package — that one bundles a duplicate React and crashes.
 */
export default function ShaderBg({ onReady }) {
  // Tells Story the Suspense fallback has resolved and the canvas is
  // actually on screen — Story uses this to start its step timers only
  // once there's something visible to look at, not the moment it mounts.
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0 }}
      pixelDensity={1}
      fov={45}
    >
      <ShaderGradient
        animate="on"
        axesHelper="off"
        brightness={1.3}
        cAzimuthAngle={180}
        cDistance={3.6}
        cPolarAngle={90}
        cameraZoom={1}
        color1="#fffbf5"
        color2="#dbd5ce"
        color3="#e1d5bd"
        destination="onCanvas"
        embedMode="off"
        envPreset="lobby"
        format="gif"
        fov={45}
        frameRate={10}
        gizmoHelper="hide"
        grain="on"
        lightType="3d"
        pixelDensity={1}
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        range="disabled"
        rangeEnd={40}
        rangeStart={0}
        reflection={0.1}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        shader="defaults"
        type="plane"
        uAmplitude={1}
        uDensity={1.3}
        uFrequency={5.5}
        uSpeed={0.4}
        uStrength={4}
        uTime={0}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}
