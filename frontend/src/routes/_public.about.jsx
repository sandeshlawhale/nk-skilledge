import { createFileRoute, Link } from '@tanstack/react-router'
import { TEAM, TIMELINE_DATA, SITE_SETTINGS, SERVICES, FEATURED_COURSES } from '@/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Rocket, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_public/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white overflow-hidden font-sans">
      {/* Shortened Hero Section - Consistent Width */}
      <section className="relative pt-12 pb-10 px-4 flex justify-center items-center overflow-hidden border-b border-slate-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
          <div>
            <p className="font-bold text-sm tracking-wide text-primary capitalize mb-4">Learn about the NK SkillEdge</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            Shaping <span className="text-primary italic">Skills</span>,<br />
            Building <span className="relative">
              Futures
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            We are a youth-led initiative bridging the gap between education and employability through practical training and industry-grade digital solutions.
          </p>
        </div>
      </section>

      {/* Founders Section - Consistent Width */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-none mb-4">The Visionaries</Badge>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Meet our <span className="text-primary underline decoration-primary/30">Founders</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {TEAM.slice(0, 2).map((founder, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row bg-white border-2 border-slate-900 p-6 gap-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]"
              >
                <div className="shrink-0">
                  <div className="w-44 h-60 border-4 border-slate-100 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                    <img
                      src={founder.name.includes("Kartik") ? "/Kartik-CEO.png" : founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = founder.image }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{founder.name}</h3>
                    <p className="text-primary font-bold uppercase tracking-widest text-[10px]">{founder.role}</p>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed italic text-sm">
                    "{founder.description}"
                  </p>
                  <div className="flex gap-4">
                    <a href={founder.socials.linkedin} className="text-slate-400 hover:text-primary transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission - Centered, No Cards, Max-width 700px */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-[700px] mx-auto space-y-16">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Our Mission</h3>
              <p className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">
                Empowering students with <span className="text-primary italic">practical skills</span> and real-world exposure that prepares them for modern careers.
              </p>
              <div className="h-1 w-20 bg-primary/20 mx-auto" />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Our Vision</h3>
              <p className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">
                To become a global leader in <span className="underline decoration-primary/30">skills-based education</span> and innovative digital solutions.
              </p>
              <div className="h-1 w-20 bg-slate-100 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Section: Consolidated Single Column */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <Badge className="bg-primary/20 text-primary border-none mb-6 rounded-none px-4 py-1 font-bold text-xs uppercase">Who We Are</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">Redefining Education Through <span className="text-primary underline underline-offset-8 decoration-4 decoration-primary/20">Action</span></h2>
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              NK SkillEdge isn't just a training center; it's a launchpad. Founded in 2023, we recognized that traditional education often lags behind the fast-paced tech industry. We decided to bridge that gap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
            <div className="group p-10 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,.4)] ">
              <div className='flex items-center gap-4'>
                <Rocket className="w-12 h-12 text-primary mb-6" />
                <h4 className="text-2xl font-black text-slate-900 mb-4">Education & Training</h4>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                We offer industry-led courses in {FEATURED_COURSES.slice(0, 3).map(c => c.title).join(", ")}. Our approach is 100% practical, focusing on project-based learning.
              </p>
              <Link to="/courses">
                <Button variant="default" size="xl" className="mt-4">
                  Explore Courses
                </Button>
              </Link>
            </div>

            <div className="group p-10 bg-slate-900 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)] ">
              <div className='flex items-center gap-4'>
                <Users className="w-12 h-12 text-background mb-6" />
                <h4 className="text-2xl font-black mb-4">Business Solutions</h4>
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">
                We collaborate with businesses to build {SERVICES.map(s => s.title.split(' ')[0]).join(", ")} and more. Our students work on real industry projects.
              </p>
              <Link to="/services">
                <Button variant="secondary" size="xl" className="mt-4">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-black text-slate-900 mb-4 italic tracking-tight">How it all started</h4>
            <p className="text-slate-500 font-medium leading-relaxed">
              The journey began with a simple idea: What if we could create an ecosystem where students learn by building things that businesses actually need? This synergy has made us a youth-led powerhouse of innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section - Consistent Width */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">Our <span className="text-primary underline decoration-primary/30">Journey</span></h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-100" />
            <div className="space-y-16 relative">
              {TIMELINE_DATA.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center w-full ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 px-8 flex justify-end">
                    <div className={`text-right w-full ${i % 2 === 0 ? '' : 'text-left!'}`}>
                      <h4 className="text-3xl font-black text-slate-900 mb-1">{item.year}</h4>
                      <h5 className="text-base font-bold text-primary mb-2 uppercase tracking-wide">{item.title}</h5>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-6 h-6 shrink-0 rounded-full border-4 border-white bg-primary shadow-xl ring-4 ring-primary/10" />
                  <div className="w-1/2 px-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Dedicated Team</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900">The Powerhouse Behind Us</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.slice(2).map((member, i) => (
              <Card key={i} className="rounded-none border-2 border-slate-100 group flex flex-col h-full bg-white shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 scale-100 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col justify-end">
                  <p className="text-primary font-black text-[9px] uppercase tracking-widest mb-1">{member.role}</p>
                  <h4 className="text-lg font-black text-slate-900 mb-2">{member.name}</h4>
                  <p className="text-slate-500 text-[11px] font-semibold leading-relaxed line-clamp-3">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-black mb-8 italic underline underline-offset-8 decoration-white/20">
              Join the Future of Learning
            </h3>
            <p className="text-white/90 text-xl font-medium mb-12">
              Whether you're a student looking for skills or a business looking for solutions, we are here to help you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a href={`https://wa.me/${SITE_SETTINGS.whatsappNumber?.replace('+', '')}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <Button size="hero" className="w-full bg-white text-primary hover:bg-slate-100 rounded-none shadow-2xl px-16 py-6 text-lg">
                  Message on WhatsApp
                </Button>
              </a>
              <Link to='/contact'>
                <Button
                  variant="outline"
                  size="hero"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 rounded-none px-16 py-6 text-lg"
                >
                  Send Inquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
