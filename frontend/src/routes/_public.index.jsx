import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Monitor, Smartphone, Share2, Check, Clock } from 'lucide-react'
import { FEATURED_COURSES, SERVICES, TRANSITION_STATS, TESTIMONIALS, FAQS, impacts } from '@/constants'
import CountUp from '@/components/ui/count-up'

const ICON_MAP = {
  globe: Monitor,
  mobile: Smartphone,
  megaphone: Share2,
};

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
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
            <div className="text-left flex-1 space-y-2">
              <p className="font-bold text-xs tracking-wide text-primary capitalize">Courses</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
          {/* <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-2">
            <div className="text-center">
              <p className="font-bold text-xs tracking-wide text-primary capitalize mb-2">Our Students</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Making a <span className="text-primary italic">Real Impact</span></h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              {impacts.map((stat, i) => (
                <div key={i} className="px-8 py-6">
                  <p className="text-4xl font-black text-slate-900 mb-1">
                    <CountUp
                      from={0}
                      to={stat.number}
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
          </div> */}
        </div>
      </section>

      {/* 3. Services Section */}
      <section className="w-full max-w-7xl py-12 px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
          <div className="text-left flex-1 space-y-2">
            <p className="font-bold text-xs tracking-wide text-primary capitalize">Services we provide</p>
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

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            {TRANSITION_STATS.map((stat, i) => (
              <div key={i} className="px-8 py-6">
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
      </section>

      {/* 3.5 About NK SkillEdge Section */}
      <section className="w-full max-w-7xl py-12 px-4 mx-auto border-t border-slate-100">
        {/* Section Header */}
        <div className="mb-8 flex items-center gap-3 w-full justify-center">
          <div className="h-px w-8 bg-primary"></div>
          <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">About NK SkillEdge</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          {/* Left Column: Image (1/3 width) */}
          <div className='md:col-span-1 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.09)]'>
            <div className="border-2 border-slate-900 bg-white overflow-hidden">
              <img
                src="/Kartik-CEO.png"
                alt="Kartik Mendhe - CEO"
                className="w-full aspect-4/5 object-cover transition-all duration-700"
              />
            </div>
          </div>

          {/* Right Column: Content (2/3 width) */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <div className="pt-2">
              <h3 className="text-3xl font-black text-slate-900">Kartik Mendhe</h3>
              <p className="text-slate-500 text-sm font-semibold capitalize tracking-wide">CEO, NK SkillEdge Pvt. Ltd.</p>
            </div>

            <div className="space-y-4 text-lg font-medium text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-500 text-base">Who We Are:</span>
              <p>
                NK SkillEdge is a youth-led initiative focused on bridging the gap between education and industry.
                Founded by passionate young innovators, our mission is to empower students with practical skills and real-world exposure
                that prepares them for modern careers.
              </p>
              <span className="font-bold text-slate-500 text-base">What We Do:</span>
              <p>
                Along with training the next generation of developers, we also build digital solutions for businesses and startups.
                From websites and applications to scalable digital platforms, NK SkillEdge combines learning with real-world development
                to create meaningful impact.
              </p>
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button variant="outline" size="hero" className="group">
                  Learn More
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </Link>
            </div>

            <div className="w-full max-w-7xl mx-auto flex flex-col space-y-2 pt-6">
              <div className="">
                <p className="font-bold text-xs tracking-wide text-primary capitalize">Our Students</p>
                <h2 className="text-3xl md:text-2xl font-semibold text-slate-900 tracking-tight">Making a <span className="text-primary italic">Real Impact</span></h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-12 w-full sm:w-auto">
                {impacts.map((stat, i) => (
                  <div key={i} className="">
                    <p className="text-4xl font-black text-slate-900 mb-1">
                      <CountUp
                        from={0}
                        to={stat.number}
                        direction="up"
                        duration={0.5}
                        className="text-primary"
                        startWhen={true}
                        separator=""
                      />{i == 2 ? "%" : "+"}
                    </p>
                    <p className="text-sm font-semibold text-primary capitalize tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
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
