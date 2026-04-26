import { Link } from 'react-router-dom'
import type { Service } from '../types'

interface Props {
  service: Service
}

export function ServiceCard({ service }: Props) {
  const { id, name, description, price, icon: Icon } = service
  const isOther = id === 'other'

  return (
    <div
      className={`bg-white rounded-2xl border p-4 flex flex-col shadow-sm ${
        isOther
          ? 'border-dashed border-slate-300 col-span-2'
          : 'border-slate-200'
      }`}
    >
      {isOther ? (
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center">
            <Icon size={22} className="text-slate-500" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-700 text-sm">{name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          </div>
          <Link
            to={`/book?service=${id}`}
            className="flex-shrink-0 bg-slate-100 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors"
          >
            Ask Us →
          </Link>
        </div>
      ) : (
        <>
          <div className="w-11 h-11 bg-gradient-to-br from-sky-100 to-green-100 rounded-xl flex items-center justify-center mb-3">
            <Icon size={22} className="text-sky-600" />
          </div>
          <p className="font-bold text-slate-800 text-sm mb-1">{name}</p>
          <p className="text-xs text-slate-500 mb-3 flex-1">{description}</p>
          <div className="flex flex-col gap-2">
            <span className="self-start text-xs font-extrabold text-white bg-gradient-to-r from-sky-500 to-green-500 px-3 py-1 rounded-full">
              ${price}
            </span>
            <Link
              to={`/book?service=${id}`}
              className="text-center bg-sky-50 text-sky-600 text-xs font-bold py-2 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors"
            >
              Book Now →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
