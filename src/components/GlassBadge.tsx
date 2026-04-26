import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function GlassBadge({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold text-white tracking-wide ${className}`}
    >
      {children}
    </span>
  )
}
