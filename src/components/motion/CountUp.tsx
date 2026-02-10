'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

export default function CountUp({
  to,
  duration = 1.2,
  prefix = '',
  suffix = '',
}: {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start: number | null = null

    const step = (t: number) => {
      if (start === null) start = t
      const p = Math.min((t - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setValue(Math.round(to * eased))
      if (p < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
