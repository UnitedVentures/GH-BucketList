import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

/**
 * Slow-moving olive & gold shader gradient behind the story. Loaded
 * lazily (three.js is heavy) — the Loader plane covers the wait.
 * NOTE: use `@shadergradient/react`, NOT the old `shadergradient`
 * package — that one bundles a duplicate React and crashes.
 */
export default function ShaderBg() {
  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0 }}
      pixelDensity={1}
      fov={45}
    >
      <ShaderGradient
        control="props"
        type="waterPlane"
        animate="on"
        uSpeed={0.15}
        uStrength={2.4}
        uDensity={1.4}
        uFrequency={3.5}
        uAmplitude={0}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={50}
        rotationY={0}
        rotationZ={-60}
        cameraZoom={15.3}
        color1="#0f120a"
        color2="#2a3418"
        color3="#8a742f"
        reflection={0.1}
        wireframe={false}
        shader="defaults"
        lightType="3d"
        brightness={1.1}
        grain="on"
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  )
}
