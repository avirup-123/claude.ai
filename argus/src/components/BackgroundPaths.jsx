import { motion } from 'framer-motion'

// Pre-generate durations so they don't change on re-renders
const DURATIONS = Array.from({ length: 36 }, () => 20 + Math.random() * 10)

// Paths coloured with the Argus blue→cyan gradient at very low opacity
const buildPaths = (position) =>
  Array.from({ length: 36 }, (_, i) => {
    const t = i / 35
    const r = Math.round(59  + (6   - 59)  * t) // #3b82f6 → #06b6d4
    const g = Math.round(130 + (182 - 130) * t)
    const b = Math.round(246 + (212 - 246) * t)
    return {
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      color: `rgba(${r},${g},${b},${0.06 + i * 0.018})`,
      width: 0.5 + i * 0.03,
    }
  })

function FloatingPaths({ position }) {
  const paths = buildPaths(position)
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <svg
        style={{ width: '100%', height: '100%' }}
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.65, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: DURATIONS[path.id],
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

/**
 * Animated flowing-path background for the Argus hero.
 * Drop this as an absolute-positioned layer inside any `position: relative` container.
 */
export function BackgroundPaths() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  )
}
