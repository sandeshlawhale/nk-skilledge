import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'

export function ServiceCard({ service, extraActions }) {
  if (!service) return null;

  return (
    <div className="group block border border-slate-200 bg-white p-5 rounded-none transition-all hover:border-slate-300 hover:shadow-sm">
      <Link 
        to="/admin/services/$serviceId"
        params={{ serviceId: service._id }}
        className="block cursor-pointer space-y-4"
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded-none uppercase tracking-widest ${service.isActive ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'}`}>
              {service.isActive ? 'Active' : 'Draft'}
            </div>
            {service.isFeatured && (
              <div className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-none uppercase tracking-widest">
                Featured
              </div>
            )}
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
             {service.category || 'General Service'}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1 uppercase italic leading-tight tracking-tight">
            {service.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {service.price > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-900">
                ₹{service.price}
            </span>
          </div>
        )}
      </Link>
      
      {/* Extra Actions (e.g. Admin Delete) */}
      {extraActions && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
           {extraActions}
        </div>
      )}
    </div>
  )
}
