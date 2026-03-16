import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Monitor, Smartphone, Share2, Check } from 'lucide-react'
import CountUp from '@/components/ui/count-up'
import { SERVICES, SERVICES_STATS } from '@/constants'

const ICON_MAP = {
  globe: Monitor,
  mobile: Smartphone,
  megaphone: Share2,
};

export function Services() {
  return (
    <section className="bg-slate-50 border-y border-slate-200">
      <div className="w-full max-w-7xl py-12 px-4 mx-auto">
        <div className="mb-4 flex items-center gap-3 w-full justify-center">
          <div className="h-px w-8 bg-primary"></div>
          <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">Services we provide</p>
        </div>
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
          <div className="text-left flex-1 space-y-2">
            <h2 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight">Solutions We Build for Businesses.</h2>
            <p className="text-xl text-slate-500 max-w-2xl font-light">
              We offer professional design and development services to help your business grow in the digital era.
            </p>
          </div>
          <Link to="/services">
            <Button variant="brutal-outline" size="hero">
              Browse all services
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Monitor;
            return (
              <div key={i} className="flex flex-col p-8 md:p-12 bg-white hover:bg-slate-50 transition-colors group relative">
                <div className="h-16 w-16 bg-slate-900 text-white flex items-center justify-center mb-4 shadow-[6px_6px_0px_0px_rgba(37,99,235,0.2)] group-hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,0.4)] transition-all">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{service.title}</h3>
                <p className="text-lg text-slate-500 leading-relaxed font-light mb-4">{service.description}</p>

                <div className="space-y-4 mb-4 mt-auto">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">What this service provides</p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 font-light">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="flex items-start gap-3 text-slate-400 font-light italic">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <span className="text-xl leading-none">...</span>
                        </div>
                        <span className="text-sm">Check details to see more</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                  <Link to="/services" className="block w-full">
                    <Button variant="brutal" className="w-full justify-between h-16 px-6 text-sm font-black group/btn bg-slate-900 hover:bg-primary transition-all duration-300">
                      <span>{service.price}</span>
                      <span className="text-2xl transition-transform group-hover/btn:translate-x-1">&rsaquo;</span>
                    </Button>
                  </Link>
                  <Link
                    to="/services"
                    className="text-sm font-semibold text-slate-400 hover:text-primary transition-colors flex items-center justify-center tracking-wide group/details"
                  >
                    See details
                    <span className="transition-transform group-hover/details:translate-x-1 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-2 mt-12">
          <div className="text-left flex-1 space-y-2 flex items-center flex-col">
            <h2 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight">From Learning to <span className="text-primary italic">Real Solutions</span></h2>
            <p className="text-xl text-slate-500 max-w-2xl font-light text-center">
              At NK SkillEdge, we don't just teach technology.<br className="hidden md:block" />
              We apply it to build real digital products for businesses and startups.
            </p>
          </div>

          <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6 w-full md:w-auto">
            {SERVICES_STATS.map((stat, i) => (
              <div key={i} className="px-8 py-3">
                <p className="text-4xl font-black text-slate-900 mb-1">
                  <CountUp
                    from={0}
                    to={stat.value}
                    direction="up"
                    duration={0.5}
                    className="text-primary"
                    startWhen={true}
                    separator=""
                  />+
                </p>
                <p className="text-sm font-semibold text-primary capitalize tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
