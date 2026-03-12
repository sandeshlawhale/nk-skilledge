import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MonitorPlay, Smartphone, BrainCircuit, Code } from 'lucide-react'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="pt-24 pb-16 px-4 md:pt-32 md:pb-24 text-center container mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
          Build real skills. Build real products.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Learn from industry experts through hands-on courses. Get custom software solutions built by our development team.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 w-full sm:w-auto">
          <Link to="#">
            <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-slate-800 rounded-none h-14 px-8 text-base font-semibold">
              Explore courses
            </Button>
          </Link>
          <Link to="#">
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-none border-2 border-slate-200 h-14 px-8 text-base font-semibold text-slate-900 hover:bg-slate-50">
              Get services
            </Button>
          </Link>
        </div>

        {/* Hero Image / Video Placeholder */}
        <div className="w-full max-w-5xl aspect-video bg-slate-200 flex items-center justify-center relative shadow-sm">
           <div className="flex flex-col items-center justify-center text-slate-400">
             <div className="w-32 h-24 border-4 border-slate-300 rounded-lg flex items-center justify-center mb-4">
               <div className="w-8 h-8 rounded-full bg-slate-300 absolute mt-[-20px] ml-[-20px]"></div>
               <div className="w-16 h-12 border-t-4 border-l-4 border-slate-300 ml-4 mt-8"></div>
             </div>
             <span className="font-medium text-xl">Image Placeholder</span>
           </div>
        </div>
      </section>

      {/* 2. Services / "What we build for you" Section */}
      <section className="py-24 bg-white px-4 border-t border-slate-100">
        <div className="container mx-auto text-center">
          <p className="font-semibold text-sm tracking-wider text-slate-500 mb-4">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What we build for you</h2>
          <p className="text-base text-slate-600 mb-16 max-w-2xl mx-auto">
            From concept to launch, we create solutions that work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-left max-w-6xl mx-auto">
            {[
              { title: 'Web development', desc: 'Fast, responsive websites built with modern frameworks and clean code.', icon: MonitorPlay },
              { title: 'App development', desc: 'Native and cross-platform applications designed for performance and user experience.', icon: Smartphone },
              { title: 'AI integration', desc: 'Machine learning models and AI features tailored to your business needs.', icon: BrainCircuit },
              { title: 'Custom software', desc: 'Bespoke solutions built to solve your unique challenges and scale with growth.', icon: Code },
            ].map((service, i) => (
              <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-full aspect-[4/3] bg-slate-200 mb-6 flex items-center justify-center text-slate-400 relative rounded-sm">
                    <service.icon className="h-10 w-10 opacity-40" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed min-h-[60px]">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
             <Button variant="outline" className="rounded-none border border-slate-300 px-8 h-12 text-sm text-slate-600 font-semibold hover:bg-slate-50">Quote</Button>
             <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium text-sm h-12 px-4 hover:bg-transparent">Arrow <span className="ml-1 leading-none text-lg">›</span></Button>
          </div>
        </div>
      </section>

      {/* 3. Customer Testimonials */}
      <section className="py-24 bg-white px-4 pt-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Customer testimonials</h2>
          <p className="text-slate-600 text-sm mb-16 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-8 text-xl font-bold text-slate-800">
                  <div className="h-4 w-4 bg-slate-800 transform rotate-45"></div> Webflow
                </div>
                <p className="text-slate-900 font-bold leading-relaxed italic mb-8 max-w-xs px-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-slate-200 rounded-full mb-3"></div>
                  <h4 className="font-bold text-slate-900 text-xs">Name Surname</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Position, Company name</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQs Section */}
      <section className="py-24 bg-white px-4 border-t border-slate-100">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">FAQs</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full mb-20">
            {[1, 2, 3, 4, 5].map((i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-slate-200 py-3">
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline text-left">
                  Question text goes here
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pt-2 pb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Still have questions?</h3>
            <p className="text-slate-600 text-sm mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button variant="outline" className="rounded-none border border-slate-300 px-8 py-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Contact</Button>
          </div>
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="py-24 bg-white px-4 border-t border-slate-100 pb-32">
        <div className="container mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 max-w-xl leading-tight mt-10">
            Medium length CTA heading goes here
          </h2>
          <p className="text-sm text-slate-600 mb-10 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
          </p>
          <div className="flex gap-4 mb-10">
            <Button className="bg-black text-white hover:bg-slate-800 rounded-none px-6 py-5 text-sm font-semibold">Button</Button>
            <Button variant="outline" className="rounded-none border border-slate-300 px-6 py-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Button</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
