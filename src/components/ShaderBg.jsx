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
        brightness={0.4}
        cAzimuthAngle={180}
        cDistance={3.1}
        cPolarAngle={90}
        cameraZoom={1}
        color1="#b8ffc1"
        color2="#007e00"
        color3="#a0e13f"
        destination="onCanvas"
        embedMode="off"
        envPreset="city"
        format="gif"
        fov={60}
        frameRate={10}
        gizmoHelper="hide"
        grain="on"
        lightType="env"
        pixelDensity={1.4}
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        range="enabled"
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
        uSpeed={0.2}
        uStrength={4}
        uTime={0}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}
