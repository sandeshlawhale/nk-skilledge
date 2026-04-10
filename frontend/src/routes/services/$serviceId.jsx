import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { SITE_SETTINGS } from '@/constants'
import { 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  MessageCircle, 
  Mail, 
  LayoutGrid, 
  Zap, 
  RotateCw,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const Route = createFileRoute('/services/$serviceId')({
  component: PublicServiceDetail,
})

function PublicServiceDetail() {
  const { serviceId } = Route.useParams()
  const [service, setService] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber.replace(/\+/g, '')}?text=Hi, I'm interested in your ${service.name} service.`
  const emailUrl = `mailto:${SITE_SETTINGS.contactEmail}?subject=Inquiry: ${service.name}&body=Hello, I would like to know more about the ${service.name} service.`

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl py-12 px-4 mx-auto font-geist">
        {/* Navigation & Title */}
        <div className="flex flex-col gap-6 mb-12">
          <Link to="/services" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase text-[9px] tracking-widest">
            <ArrowLeft className="h-3 w-3" /> Back to Catalog
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary"></div>
                <p className="font-bold text-[10px] tracking-[0.2em] text-primary uppercase">{service.category || 'Professional Level'}</p>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-[0.9]">
                {service.name}
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-2 min-w-[240px]">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Starting From</span>
               <div className="text-3xl font-black italic tracking-tighter text-slate-900">
                  {service.price ? `₹${service.price}` : "Request Quote"}
               </div>
               <div className="flex gap-2 mt-2">
                 <Button asChild className="rounded-none flex-1 bg-green-600 hover:bg-green-700 h-12 text-[10px] font-black uppercase tracking-widest">
                    <a href={whatsappUrl} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                    </a>
                 </Button>
                 <Button asChild className="rounded-none flex-1 bg-slate-900 hover:bg-primary h-12 text-[10px] font-black uppercase tracking-widest transition-all">
                    <a href={emailUrl}>
                      <Mail className="h-4 w-4 mr-2" /> Email
                    </a>
                 </Button>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* What it provides */}
            {service.whatItProvides?.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">What this service provides</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.whatItProvides.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 italic font-bold text-slate-700 uppercase text-xs">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Features */}
            {service.features?.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  < Zap className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Key Features</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {service.features.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-white border-2 border-slate-900 group hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-slate-300">{(i+1).toString().padStart(2, '0')}</span>
                        <span className="font-bold text-slate-900 uppercase italic tracking-wider text-sm">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Process */}
            {service.process?.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <RotateCw className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Our Process Strategy</h2>
                </div>
                <div className="space-y-4">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex gap-6 p-6 border border-slate-100 hover:border-slate-300 transition-all group">
                      <div className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center font-black italic shrink-0 group-hover:bg-primary transition-colors">
                        {i + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-slate-900 uppercase italic text-lg tracking-tight">Phase {i + 1}</h4>
                        <p className="text-slate-500 font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {service.faq?.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Common Inquiries</h2>
                </div>
                <div className="space-y-4">
                  {service.faq.map((item, i) => (
                    <Card key={i} className="rounded-none border-slate-200 shadow-none">
                      <CardContent className="p-6 space-y-3">
                        <h4 className="font-black text-slate-900 uppercase italic text-sm tracking-tight flex gap-3">
                          <span className="text-primary tracking-widest">Q:</span> {item.question}
                        </h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed pl-7">
                          {item.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
             {/* Technology Grid */}
             {service.technologies?.length > 0 && (
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Stack Used</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {service.technologies.map((tech, i) => (
                      <div key={i} className="flex items-center justify-center p-3 bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-default">
                        {tech}
                      </div>
                    ))}
                  </div>
               </div>
             )}

             {/* Cover Image */}
             {service.coverImage && (
               <Card className="rounded-none border-2 border-slate-900 overflow-hidden shadow-none">
                 <img src={service.coverImage} alt="Service Cover" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
               </Card>
             )}

             {/* Sticky Contact CTA */}
             <div className="sticky top-8 space-y-6">
                <Card className="rounded-none border-2 border-slate-900 bg-slate-900 text-white shadow-none">
                  <CardContent className="p-8 space-y-6">
                    <h3 className="text-xl font-black uppercase italic tracking-tight leading-none">Ready to start your project?</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                      Our experts are ready to build the solution you need. Contact us today for a detailed consultation.
                    </p>
                    <div className="space-y-3 pt-2">
                       <Button asChild className="w-full rounded-none bg-green-600 hover:bg-green-700 h-14 font-black uppercase tracking-widest">
                          <a href={whatsappUrl} target="_blank" rel="noreferrer">
                            <MessageCircle className="h-5 w-5 mr-2" /> Message on WhatsApp
                          </a>
                       </Button>
                       <Button asChild variant="outline" className="w-full rounded-none border-white text-white hover:bg-white hover:text-slate-900 h-14 font-black uppercase tracking-widest bg-transparent">
                          <a href={emailUrl}>
                            <Mail className="h-5 w-5 mr-2" /> Send Email Inquiry
                          </a>
                       </Button>
                    </div>
                  </CardContent>
                </Card>
             </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
