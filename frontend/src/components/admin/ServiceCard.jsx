import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'

export function ServiceCard({ service, extraActions }) {
  if (!service) return null;

  return (
    <div className="group block space-y-3">
      <Link 
        to="/admin/services/$serviceId"
        params={{ serviceId: service._id }}
        className="block cursor-pointer"
      >
        {/* Logo/Image Container */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 rounded-none shadow-none transition-shadow">
          <img
            src={service.coverImage || `https://placehold.co/600x400/e2e8f0/4f46e5?text=No+Image`}
            alt={service.name}
            className="object-cover w-full h-full"
          />
          
          {/* Active/Draft Badge */}
          <div className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-none uppercase tracking-widest ${service.isActive ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'}`}>
            {service.isActive ? 'Active' : 'Draft'}
          </div>

          {service.isFeatured && (
            <div className="absolute top-2 left-2 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-none uppercase tracking-widest">
              Featured
            </div>
          )}
        </div>

        {/* Service Info */}
        <div className="space-y-1 px-1 mt-3">
          <h3 className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1 uppercase italic leading-tight tracking-tight">
            {service.name}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
          <div className="flex items-center justify-between pt-1">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {service.category || 'General Service'}
             </span>
             {service.price > 0 && (
                <span className="text-[10px] font-bold text-slate-900">
                    ₹{service.price}
                </span>
             )}
          </div>
        </div>
      </Link>
      
      {/* Extra Actions (e.g. Admin Delete) */}
      {extraActions && (
        <div className="px-1 flex gap-2">
           {extraActions}
        </div>
      )}
    </div>
  )
}
