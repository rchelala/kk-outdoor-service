import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import type { Service } from '../types'

interface Props {
  service: Service
}

export function ServiceCard({ service }: Props) {
  const { id, name, description, price, duration, icon: Icon } = service
  const isOther = id === 'other'

  return (
    <div
      className={`rounded-2xl border p-4 flex flex-col transition-all duration-200 hover:-translate-y-0.5 ${
        isOther
          ? 'col-span-2'
          : ''
      }`}
      style={{
        background: 'color-mix(in oklch, white 65%, transparent)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        borderColor: isOther ? 'var(--line-2)' : 'color-mix(in oklch, white 65%, transparent)',
        borderStyle: isOther ? 'dashed' : 'solid',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
      }}
    >
      {isOther ? (
        <div className="flex items-center gap-4">
          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--bg-2)', color: 'var(--ink-3)' }}
          >
            <Icon size={22} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: 'var(--ink)' }}>{name}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--ink-3)' }}>{description}</p>
          </div>
          <Link
            to={`/book?service=${id}`}
            className="flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg border transition-colors"
            style={{
              background: 'var(--bg-2)',
              color: 'var(--ink-2)',
              borderColor: 'var(--line)',
            }}
          >
            Ask Us →
          </Link>
        </div>
      ) : (
        <>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
            style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
          >
            <Icon size={22} />
          </div>
          <p className="font-bold text-sm mb-1" style={{ color: 'var(--ink)' }}>{name}</p>
          <p className="text-xs mb-3 flex-1 leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            {description}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-extrabold text-white px-3 py-1 rounded-full"
                style={{ background: 'var(--primary)' }}
              >
                ${price}
              </span>
              {duration && (
                <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--ink-3)' }}>
                  <Clock size={11} />
                  {duration}
                </span>
              )}
            </div>
            <Link
              to={`/book?service=${id}`}
              className="text-center text-xs font-bold py-2 rounded-lg border transition-colors"
              style={{
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)',
              }}
            >
              Book Now →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
