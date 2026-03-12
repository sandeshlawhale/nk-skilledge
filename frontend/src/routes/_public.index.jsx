import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Clock } from 'lucide-react'
import { FEATURED_COURSES, SERVICES, TESTIMONIALS, FAQS } from '@/constants'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl py-16 px-4 overflow-hidden container mx-auto flex flex-col items-center text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter max-w-full leading-[1.1]">
          Transforming Talent Into<br /> Industry-Ready <span className="text-primary italic">Professionals.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 w-full text-center font-light leading-relaxed">
          Gain hands-on learning, industry insights, and the confidence to succeed.<br />
          We prepare students with the skills needed for today&apos;s professional world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 w-full sm:w-auto">
          <Link to="/courses">
            <Button size="hero" variant="brutal" className="w-full">
              Explore courses
            </Button>
          </Link>
          <Link to="/services">
            <Button size="hero" variant="brutal-outline" className="w-full">
              Get services
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-7xl aspect-21/9 bg-slate-900 border border-slate-900 shadow-[10px_10px_0px_0px_rgba(37,99,235,0.1)] relative overflow-hidden group">
          <img
            src="/brain/4cabaed3-a5e4-41df-bbd0-4b795a90aa25/hero_coding_premium_1773318755118.png"
            alt="Premium Coding Environment"
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* 2. Featured Courses Section */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="w-full max-w-7xl py-16 px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="text-left flex-1 space-y-2">
              <p className="font-black text-xs tracking-[0.2em] text-primary uppercase">Courses</p>
              <h2 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight">Build Skills That Companies Actually Hire For.</h2>
              <p className="text-xl text-slate-500 max-w-2xl font-light">
                Hands-on training programs designed with real projects, industry tools, and mentorship to help you become job-ready.
              </p>
            </div>
            <Link to="/courses">
              <Button variant="brutal-outline" size="hero">
                Browse all courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_COURSES.map((course, i) => (
              <div key={i} className="group flex flex-col bg-white border border-slate-200 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] transition-all relative z-1 hover:z-10">
                <div className="w-full aspect-video bg-slate-100 relative overflow-hidden">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-col p-4 flex-1">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 font-light">{course.description}</p>
                  </div>
                  <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {course.duration}
                    </div>
                    <Link
                      to="/courses/$courseId"
                      params={{ courseId: course.id }}
                      className="inline-flex items-center justify-center bg-slate-100 hover:bg-primary hover:text-white text-slate-900 px-3 py-1.5 font-black text-[10px] tracking-widest uppercase transition-all duration-300"
                    >
                      View &rsaquo;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section className="py-32 bg-white px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="text-left flex-1">
              <p className="font-black text-xs tracking-[0.2em] text-primary mb-6 uppercase">SOLUTIONS</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Engineering excellence.</h2>
              <p className="text-xl text-slate-500 max-w-2xl font-light">
                We craft high-performance digital ecosystems for businesses that demand the absolute best.
              </p>
            </div>
            <Link to="/services">
              <Button variant="brutal-outline" size="hero">
                Browse all services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {SERVICES.map((service, i) => (
              <div key={i} className="flex flex-col p-12 bg-white hover:bg-slate-50 transition-colors group">
                <div className="h-16 w-16 bg-slate-900 text-white flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_rgba(37,99,235,0.2)] group-hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,0.4)] transition-all">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                <p className="text-lg text-slate-500 leading-relaxed font-light mb-8">{service.desc}</p>
                <Link to="/services" className="text-base font-black text-slate-900 hover:text-primary transition-colors flex items-center gap-2 group/link">
                  Learn more <span className="text-2xl transition-transform group-hover/link:translate-x-1">&rsaquo;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Customer Testimonials */}
      <section className="py-32 bg-slate-900 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <p className="font-black text-xs tracking-[0.2em] text-primary mb-6 uppercase">SOCIAL PROOF</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by pioneers.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800 border border-slate-800">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="flex flex-col p-12 bg-slate-900">
                <div className="flex items-center gap-3 mb-10 text-2xl font-black text-white italic">
                  NK <span className="text-primary not-italic">SKILLEDGE</span>
                </div>
                <p className="text-slate-300 font-light text-xl leading-relaxed italic mb-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-14 h-14 bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.author}</h4>
                    <p className="text-primary text-xs font-black tracking-widest uppercase">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-32 bg-white px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Questions.</h2>
            <p className="text-xl text-slate-500 font-light">
              Everything you need to know about our process and platform.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-2 border-slate-900 px-8 py-2">
                <AccordionTrigger className="text-xl font-bold text-slate-900 hover:no-underline text-left py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-lg leading-relaxed pb-8 font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-24 p-12 bg-slate-50 border-2 border-slate-900 text-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Still have questions?</h3>
            <p className="text-xl text-slate-500 font-light mb-10">Reach out to our engineering team directly.</p>
            <Button variant="brutal" size="hero" className="bg-slate-900 hover:bg-slate-800">Contact Us</Button>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="py-32 bg-primary px-4">
        <div className="container mx-auto text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 max-w-4xl leading-[1.1] tracking-tighter">
            Ready to build the future?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-2xl font-light">
            Join 10,000+ students and companies building world-class technology with NK Skilledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/signup">
              <Button size="hero" variant="brutal" className="bg-white text-primary hover:bg-slate-50">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
