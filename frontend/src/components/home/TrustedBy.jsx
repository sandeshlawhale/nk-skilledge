import { Marquee } from '@/components/ui/marquee'
import { TRUSTED_COMPANIES } from '@/constants'

export function TrustedBy() {
  return (
    <section className="w-full max-w-7xl px-4 mx-auto py-12 flex flex-col items-center overflow-hidden relative">
      <div className="mb-4 flex items-center gap-3 w-full justify-center">
        <div className="h-px w-8 bg-primary/50"></div>
        <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">Trusted By</p>
      </div>
      <div className="relative w-full">
        <Marquee className="[--duration:40s] [--gap:5rem] py-4" pauseOnHover>
          {TRUSTED_COMPANIES.map((company, i) => (
            <div key={i} className="flex items-center gap-2 filter grayscale transition-all hover:grayscale-0 duration-500 cursor-default">
              <div className="h-6 md:h-8 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-full w-auto object-contain"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/40x40/f1f5f9/94a3b8?text=" + company.name.charAt(0);
                  }}
                />
              </div>
              <span className="text-sm md:text-base font-semibold text-slate-400 hover:text-slate-900 tracking-tight transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </Marquee>
        {/* Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white mb-2"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white mb-2"></div>
      </div>
    </section>
  )
}
