import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function GradientButton({ children, loading, className = '', ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-green-500 text-white font-bold text-sm shadow-lg shadow-sky-500/30 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? 'Sending...' : children}
    </button>
  )
}
