import { Link } from '@tanstack/react-router'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function PublicServiceCard({ service }) {
  return (
    <Card className="rounded-none border-2 border-slate-900 shadow-none hover:shadow-[8px_8px_0px_0px_rgba(241,245,249,1)] transition-all bg-white group flex flex-col h-full">
      {/* Cover Image Container */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 border-b-2 border-slate-900">
        <img
          src={service.coverImage || `https://placehold.co/600x400/e2e8f0/4f46e5?text=No+Image`}
          alt={service.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {service.isFeatured && (
          <div className="absolute top-4 left-4">
            <div className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 italic">
              Featured Solution
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-6 bg-slate-900" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {service.category || "Professional Service"}
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-3 uppercase italic tracking-tight group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        
        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 mb-6">
          {service.description}
        </p>

        {/* Benefits Preview */}
        {service.whatItProvides?.length > 0 && (
          <div className="space-y-3 mb-8">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Included Benefits</p>
             <ul className="space-y-2">
                {service.whatItProvides.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700 uppercase italic">
                    <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
             </ul>
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pricing Model</span>
            <span className="text-sm font-black text-slate-900 uppercase italic">
              {service.price ? `Starts at ₹${service.price}` : "Request Quote"}
            </span>
          </div>
          <Link to="/services/$serviceId" params={{ serviceId: service._id }}>
            <Button size="sm" className="rounded-none bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-[9px] h-10 px-4 group/btn">
              Details <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
