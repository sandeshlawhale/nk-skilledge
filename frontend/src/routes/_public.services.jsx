import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { MonitorPlay, Smartphone, BrainCircuit, Code } from 'lucide-react'

export const Route = createFileRoute('/_public/services')({
  component: ServicesPage,
})

function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-16">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-700 text-sm font-semibold mb-6">
            Our Services
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 tracking-tight mb-6">
            Custom software that <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">scales.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Beyond education, our elite development team builds enterprise-grade applications, AI integrations, and digital platforms for ambitious companies.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              { title: 'Web development', desc: 'Fast, responsive websites built with modern frameworks and clean architecture.', icon: MonitorPlay, color: 'text-sky-500', bg: 'bg-sky-50', hoverBorder: 'hover:border-sky-200' },
              { title: 'App development', desc: 'Native and cross-platform applications designed for performance and UX.', icon: Smartphone, color: 'text-orange-500', bg: 'bg-orange-50', hoverBorder: 'hover:border-orange-200' },
              { title: 'AI integration', desc: 'Machine learning models and AI features tailored to your business needs.', icon: BrainCircuit, color: 'text-indigo-500', bg: 'bg-indigo-50', hoverBorder: 'hover:border-indigo-200' },
              { title: 'Custom software', desc: 'Bespoke solutions built to solve your unique challenges and scale with growth.', icon: Code, color: 'text-teal-500', bg: 'bg-teal-50', hoverBorder: 'hover:border-teal-200' },
            ].map((service, i) => (
              <div key={i} className={`group flex flex-col items-start p-10 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${service.hoverBorder}`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-bl-full -z-10 transition-colors group-hover:bg-slate-100/50"></div>
                <div className={`w-16 h-16 rounded-2xl ${service.bg} mb-6 flex items-center justify-center ${service.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                    <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed font-medium mb-6 flex-1">{service.desc}</p>
                <Button variant="outline" className="rounded-full border-slate-200 hover:border-slate-300 font-bold transition-all">Learn more</Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
