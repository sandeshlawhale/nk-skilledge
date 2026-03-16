import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Monitor, Smartphone, Share2, Check, Clock } from 'lucide-react'
import { FEATURED_COURSES, SERVICES, TRANSITION_STATS, TESTIMONIALS, FAQS, impacts, TRUSTED_COMPANIES } from '@/constants'
import CountUp from '@/components/ui/count-up'
import { Marquee } from '@/components/ui/marquee'

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

      {/* 1.5 Trusted By Section */}
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white mb-2"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white mb-2"></div>
        </div>
      </section>

      {/* 2. Featured Courses Section */}
      <section className="w-full max-w-7xl py-12 px-4 mx-auto">
        <div className="mb-4 flex items-center gap-3 w-full justify-center">
          <div className="h-px w-8 bg-primary"></div>
          <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">Courses</p>
        </div>
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
          <div className="text-left flex-1 space-y-2">
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
      </section>

      {/* 3. Services Section */}
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
              {TRANSITION_STATS.map((stat, i) => (
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

              <div className="grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-12 w-full md:w-auto">
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

      {/* 4. Testimonials Section */}
      <section className="py-12 bg-white overflow-hidden border-t border-slate-100 flex flex-col h-screen max-h-[800px] justify-center">
        <div className="text-center space-y-2 mb-8 px-4">
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="h-px w-8 bg-primary"></div>
            <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">What People Say About Us</p>
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight">Voices of Trust & Excellence.</h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto w-full font-light">
            Don't just take our word for it. Here's what our clients and students have to say about their experience with NK SkillEdge.
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center overflow-hidden w-full">
          <Marquee pauseOnHover className="[--duration:40s] [--gap:0px] border-l border-slate-200">
            {TESTIMONIALS.slice(0, Math.ceil(TESTIMONIALS.length / 2)).map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[350px] flex flex-col p-6 bg-white border-y border-r border-slate-200 hover:bg-slate-50 transition-colors h-full"
              >
                <div className="flex-1 mb-4">
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic line-clamp-4">
                    "{testimonial.testimonial}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">{testimonial.clientName}</h4>
                  <p className="text-xs text-slate-500">
                    {testimonial.designation} <span className="text-primary font-semibold">@{testimonial.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:45s] [--gap:0px] border-l border-slate-200 mt-[-1px]">
            {TESTIMONIALS.slice(Math.ceil(TESTIMONIALS.length / 2)).map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[350px] flex flex-col p-6 bg-white border-y border-r border-slate-200 hover:bg-slate-50 transition-colors h-full"
              >
                <div className="flex-1 mb-4">
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic line-clamp-4">
                    "{testimonial.testimonial}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">{testimonial.clientName}</h4>
                  <p className="text-xs text-slate-500">
                    {testimonial.designation} <span className="text-primary font-semibold">@{testimonial.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="w-full max-w-7xl py-12 px-4 mx-auto border-t border-slate-100">
        <div className="mb-8 flex items-center gap-3 w-full justify-center">
          <div className="h-px w-8 bg-primary"></div>
          <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">FAQ</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12 items-start">
          {/* Left Column: Heading & CTA (1/3) */}
          <div className="md:col-span-1 space-y-8">
            <div className="space-y-4">
              {/* <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary"></div>
                <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">FAQ</p>
              </div> */}
              <h2 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                Frequently Asked <span className="text-primary italic">Questions.</span>
              </h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                Find answers to common questions about our courses, services, and how NK SkillEdge helps students and businesses grow.
              </p>
            </div>

            {/* CTA - Hidden on mobile as per requirement */}
            <div className="hidden md:block p-8 bg-white border border-slate-200 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,0.1)] transition-all duration-300">
              <p className="text-slate-900 font-bold leading-relaxed">
                Still have questions?
              </p>
              <Link to="/contact">
                <Button variant="brutal" className="w-full bg-slate-900 hover:bg-primary transition-all duration-300 h-14">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion (2/3) */}
          <div className="md:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-t border-slate-200 last:border-b"
                >
                  <AccordionTrigger className="text-lg md:text-xl font-bold text-slate-900 hover:text-primary hover:no-underline text-left py-5 px-4 transition-colors cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 text-base md:text-lg leading-relaxed pb-5 font-light px-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="w-full max-w-7xl py-12 px-4 mx-auto overflow-hidden">

        <div className="relative bg-slate-950 p-8 md:p-12 md:px-16 overflow-hidden group border border-white/5">
          {/* Mesh Gradient Blobs */}
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-emerald-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-[-30%] right-[10%] w-[70%] h-[90%] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[70%] bg-pink-500/40 blur-[100px] rounded-full mix-blend-screen"></div>

          <div className="relative z-10 flex flex-col items-start text-left space-y-2 max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter leading-[1.1]">
              Ready to Start{" "}
              <span className="text-white italic">Your Journey?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-xl">
              Join our industry-focused courses or partner with us to build innovative digital solutions.
            </p>
            <div className="pt-4 flex flex-row gap-6">
              <Link to="/courses">
                <Button size="xl" variant="secondary" className="border border-background">
                  View Courses
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="text-background">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
