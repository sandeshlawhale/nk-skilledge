import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { SITE_SETTINGS } from '@/constants'
import {
  Loader2,
  ArrowLeft,
  MessageCircle,
  Mail,
  Zap,
  ChevronDown,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const Route = createFileRoute('/services/$serviceId')({
  component: PublicServiceDetail,
})

function PublicServiceDetail() {
  const { serviceId } = Route.useParams()
  const [service, setService] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/${serviceId}`)
        const data = await response.json()
        if (data.success) {
          setService(data.data)
        }
      } catch (error) {
        console.error('Error fetching service:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchService()
  }, [serviceId])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Service Details...</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Service Not Found</h2>
        <Button asChild>
          <Link to="/services">Back to Catalog</Link>
        </Button>
      </div>
    )
  }

  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in your ${service.name} service.`)}`
  const emailUrl = `mailto:${SITE_SETTINGS.contactEmail}?subject=${encodeURIComponent(`Inquiry: ${service.name}`)}&body=${encodeURIComponent(`Hello, I would like to know more about the ${service.name} service.`)}`

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 w-full max-w-7xl py-8 px-4 mx-auto font-geist">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/services" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase text-[9px] tracking-widest">
            <ArrowLeft className="h-3 w-3" /> Back to Services
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Primary Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-primary"></div>
                <p className="font-bold text-[9px] tracking-[0.2em] text-primary uppercase">{service.category || 'Professional Service'}</p>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-[0.85]">
                {service.name}
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            {/* Tech Grid Internal */}
            {service.technologies?.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Technologies Involved</p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="rounded-none border-slate-200 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-slate-50 text-slate-500">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* What it provides - Clean List */}
            {service.whatItProvides?.length > 0 && (
              <section className="space-y-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Included Expertise</h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                  {service.whatItProvides.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-4 w-4 rounded-full border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="h-1 w-1 bg-primary rounded-full" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 uppercase italic tracking-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Key Features - Clean List */}
            {service.features?.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Key Features</h2>
                </div>
                <ul className="space-y-2">
                  {service.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 border-b border-slate-50 last:border-0">
                      <Zap className="h-3.5 w-3.5 text-primary shrink-0 mt-1" />
                      <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ Area - Accordion */}
            {service.faq?.length > 0 && (
              <section className="space-y-2 pt-10 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide">General FAQ</h2>
                  <Info className="h-4 w-4 text-slate-200" />
                </div>
                <div className="space-y-2">
                  {service.faq.map((item, i) => {
                    const isOpen = openFaqIndex === i;
                    return (
                      <div key={i} className="border-b border-slate-100 last:border-0">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                          className="w-full flex items-center justify-between py-4 group text-left"
                        >
                          <h4 className="font-bold text-slate-900 uppercase italic text-sm tracking-tight flex items-center gap-3">
                            <span className="text-primary tracking-widest shrink-0">Q:</span> {item.question}
                          </h4>
                          <ChevronDown className={`h-4 w-4 text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-slate-900'}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                          <p className="text-slate-500 font-medium text-sm leading-relaxed pl-7 max-w-2xl border-l border-primary/20 ml-1">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Inquiry */}
          <aside className="flex flex-col gap-8">
            {/* Pricing & Summary Block */}
            <div className="p-6 border-2 border-slate-900 bg-white space-y-6 order-1 md:order-0 ">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Starting from</p>
                <div className="text-3xl font-black italic tracking-tighter text-slate-900">
                  {service.price ? `₹${service.price}` : "Custom"}
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="space-y-2 pt-2">
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest text-center mb-2">Start formal inquiry</p>
                <Button asChild className="w-full rounded-none bg-green-600 hover:bg-green-700 h-12 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(22,163,74,0.1)]">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className='flex items-center'>
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-none border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white h-12 font-black uppercase tracking-widest transition-all">
                  <a href={emailUrl} className='flex items-center'>
                    <Mail className="h-4 w-4 mr-2" /> Connect via mail
                  </a>
                </Button>
              </div>

              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest text-center">
                Direct response within 24 hours
              </p>
            </div>
            {service.process?.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Execution Workflow</h2>
                </div>
                <div className="space-y-6 relative pl-6">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-800" />
                  {service.process.map((step, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-white border-2 border-slate-900 group-hover:bg-primary group-hover:border-primary transition-colors duration-300" />
                      <div className="space-y-1">
                        <div className="text-[9px] font-black uppercase tracking-widest text-primary">Step {i + 1}</div>
                        <p className="text-base text-slate-600 font-medium leading-relaxed max-w-xl">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
