import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MonitorPlay, Smartphone, BrainCircuit, Code } from 'lucide-react'
import { HeroParticles } from '@/components/HeroParticles'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-12 px-4 md:pt-16 md:pb-20 overflow-hidden flex flex-col items-center">
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-400/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <HeroParticles />


        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/50 border border-sky-200 text-sky-700 text-sm font-semibold mb-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            New courses are live
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-slate-900 tracking-tight max-w-5xl mx-auto mb-4 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
            Build real <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">skills.</span><br/> Build real <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">products.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both">
            Learn from industry experts through hands-on courses. Get custom software solutions built by our elite development team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 fill-mode-both">
            <Link to="#">
              <Button size="lg" className="w-full sm:w-auto bg-sky-500 text-white hover:bg-sky-600 rounded-full h-14 px-8 text-base font-bold shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-1">
                Explore courses
              </Button>
            </Link>
            <Link to="#">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-2 border-slate-200 h-14 px-8 text-base font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all">
                Get services
              </Button>
            </Link>
          </div>

          {/* Hero Mockup */}
          <div className="w-full max-w-5xl mx-auto aspect-video bg-slate-900/5 rounded-2xl border border-slate-200/50 shadow-2xl backdrop-blur-sm flex items-center justify-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-700 fill-mode-both">
             <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 to-orange-50/40"></div>
             {/* Abstract Mockup Elements */}
             <div className="relative z-10 w-[80%] h-[80%] bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col overflow-hidden opacity-95">
                <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50/80">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 p-6 flex items-center justify-center bg-slate-50 relative">
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                   <BrainCircuit className="w-24 h-24 text-sky-200/50 relative z-10" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Services / "What we build for you" Section */}
      <section className="py-24 bg-white px-4">
        <div className="container mx-auto text-center relative">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold tracking-wide uppercase">Services</div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6">What we build for you</h2>
          <p className="text-lg text-slate-600 mb-20 max-w-2xl mx-auto font-medium">
            From concept to launch, we create solutions that don't just work—they impress.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-left max-w-6xl mx-auto">
            {[
              { title: 'Web development', desc: 'Fast, responsive websites built with modern frameworks and clean code.', icon: MonitorPlay, color: 'text-sky-500', bg: 'bg-sky-50', hoverBorder: 'hover:border-sky-200' },
              { title: 'App development', desc: 'Native and cross-platform applications designed for performance and UX.', icon: Smartphone, color: 'text-orange-500', bg: 'bg-orange-50', hoverBorder: 'hover:border-orange-200' },
              { title: 'AI integration', desc: 'Machine learning models and AI features tailored to your business needs.', icon: BrainCircuit, color: 'text-indigo-500', bg: 'bg-indigo-50', hoverBorder: 'hover:border-indigo-200' },
              { title: 'Custom software', desc: 'Bespoke solutions built to solve your unique challenges and scale with growth.', icon: Code, color: 'text-teal-500', bg: 'bg-teal-50', hoverBorder: 'hover:border-teal-200' },
            ].map((service, i) => (
              <div key={i} className={`group flex flex-col items-start p-8 rounded-3xl border border-slate-100/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${service.hoverBorder}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 transition-colors group-hover:bg-slate-100/50"></div>
                <div className={`w-14 h-14 rounded-2xl ${service.bg} mb-6 flex items-center justify-center ${service.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                    <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
             <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-14 text-base font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 border border-slate-900">
               Request a Quote
             </Button>
          </div>
        </div>
      </section>

      {/* 3. Customer Testimonials */}
      <section className="py-28 bg-slate-50 px-4 border-y border-slate-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-5">Loved by our students</h2>
          <p className="text-slate-600 text-lg mb-20 max-w-xl mx-auto font-medium">
            Hear what our graduates and clients have to say about NKSkilledge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center relative">
            {[1, 2, 3].map((item, i) => (
              <div key={item} className="flex flex-col items-center bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 relative mt-4">
                <div className="absolute -top-6 text-6xl text-orange-200 font-serif leading-none">"</div>
                <div className="flex items-center gap-1 mb-8 mt-2 text-orange-400">
                  {/* Stars */}
                  {[1,2,3,4,5].map(s => <svg key={s} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed mb-10 flex-1 text-base">
                  "This platform completly changed how I approach {['web development', 'software engineering', 'AI integration'][i]}. The hands-on curriculum is unmatched in the industry."
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-200 to-sky-100 rounded-full mb-4 border-2 border-white shadow-sm flex items-center justify-center font-bold text-sky-700 text-lg">
                    {['JD', 'AS', 'MR'][i]}
                  </div>
                  <h4 className="font-bold font-heading text-slate-900">{['Jane Doe', 'Alex Smith', 'Mike Ross'][i]}</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1">{['Software Engineer', 'Frontend Lead', 'AI Researcher'][i]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQs Section */}
      <section className="py-24 bg-white px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6">Got questions?</h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto font-medium">
              Everything you need to know about our courses and services.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full mb-16 space-y-4">
            {[
              { q: 'What is NKSkilledge?', a: 'We are a premier educational and software development platform offering high-quality courses and bespoke software solutions.' },
              { q: 'How do the courses work?', a: 'Our courses are project-based. You will learn by building real-world applications with modern tools and frameworks.' },
              { q: 'Can I hire your team for my project?', a: 'Absolutely. We offer custom software development services running in parallel with our educational platform.' },
              { q: 'What technologies do you teach?', a: 'We focus on modern, industry-standard stacks including React, Node.js, Python, and various AI integrations.' },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-slate-100 bg-slate-50/50 rounded-2xl px-6 data-[state=open]:bg-white data-[state=open]:shadow-md data-[state=open]:border-sky-100 transition-all duration-300">
                <AccordionTrigger className="text-lg font-bold font-heading text-slate-900 hover:no-underline py-5 text-left hover:text-sky-600 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base font-medium leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex justify-center">
             <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-sky-50/50 px-8 py-6 rounded-3xl border border-sky-100/50">
                <div className="text-center sm:text-left">
                   <h3 className="text-base font-bold font-heading text-slate-900 mb-1">Still have questions?</h3>
                   <p className="text-sm text-slate-600 font-medium">Our team is here to help you get started.</p>
                </div>
                <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 border-none px-6 h-12 font-bold shadow-sm hover:shadow-md transition-all">Contact Support</Button>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="py-24 px-4 pb-32 bg-white">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-sky-600 to-sky-500 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-[80px]"></div>
            
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            <div className="relative z-10 flex flex-col items-center">
               <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 max-w-2xl leading-tight">
                 Ready to accelerate your career?
               </h2>
               <p className="text-lg md:text-xl text-sky-50 mb-10 max-w-xl font-medium">
                 Join thousands of students and clients who trust NKSkilledge to deliver excellence in tech.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                 <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600 rounded-full px-10 h-14 text-base font-bold shadow-[0_0_40px_-10px_rgba(249,115,22,0.8)] transition-all hover:shadow-[0_0_60px_-15px_rgba(249,115,22,0.8)] hover:-translate-y-1 w-full sm:w-auto">
                   Start Learning Now
                 </Button>
                 <Button size="lg" variant="outline" className="rounded-full border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 h-14 px-8 text-base font-bold transition-all backdrop-blur-sm w-full sm:w-auto">
                   Talk to Sales
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
