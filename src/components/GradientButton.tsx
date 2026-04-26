import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function GradientButton({ children, loading, className = '', style, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full py-3 px-6 rounded-full text-white font-semibold text-sm transition-opacity disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      style={{ background: 'var(--primary)', ...style }}
    >
      {loading ? 'Sending...' : children}
    </button>
  )
}
