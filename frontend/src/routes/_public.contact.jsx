import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SITE_SETTINGS } from '@/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_public/contact')({
  component: ContactPage,
})

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Your message has been sent successfully!')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden font-sans">
      {/* <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
          <Badge className="bg-primary/10 text-primary border-none mb-6 px-4 py-1.5 rounded-none font-black text-[10px] uppercase tracking-widest">Get In Touch</Badge>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6 italic">
            Let's Start a <span className="text-primary underline decoration-primary/20">Conversation</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium italic">
            If you have anything to talk or discuss about a project or services, please contact us.
          </p>


      <div className="flex justify-center gap-6 mb-4">
        <a
          href={`https://wa.me/${SITE_SETTINGS.whatsappNumber?.replace('+', '')}`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center p-5 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          aria-label="WhatsApp Contact"
        >
          <MessageSquare className="w-8 h-8 text-slate-900 group-hover:text-primary transition-colors" />
        </a>
        <a
          href={`mailto:${SITE_SETTINGS.contactEmail}`}
          className="group flex items-center justify-center p-5 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          aria-label="Email Contact"
        >
          <Mail className="w-8 h-8 text-slate-900 group-hover:text-primary transition-colors" />
        </a>
      </div>
    </div> */}

      {/* Main Two-Column Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Column: Contact Details */}
            <div className="space-y-12">
              <div className="z-10 max-w-7xl">
                <Badge className="bg-primary/10 text-primary border-none mb-2 px-4 py-1.5 rounded-none font-black text-xs uppercase tracking-widest">Get In Touch</Badge>
                <h1 className="text-base md:text-3xl font-black text-slate-900 leading-tight mb-2 italic">
                  Let's Start a <span className="text-primary underline decoration-primary/20">Conversation</span>
                </h1>
                <p className="text-base text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed font-medium italic">
                  If you have anything to talk or discuss about a project or services, please contact us.
                </p>

                {/* Icon Links (WhatsApp & Mail) */}
                <div className="flex gap-6 mb-2">
                  <a
                    href={`https://wa.me/${SITE_SETTINGS.whatsappNumber?.replace('+', '')}`}
                    target="_blank"

                  >
                    <Button size='xl' variant='outline'>
                      <MessageSquare className="w-8 h-8 text-slate-900 group-hover:text-primary transition-colors" />
                      Whatsapp
                    </Button>
                  </a>
                  <a
                    href={`mailto:${SITE_SETTINGS.contactEmail}`}
                  >
                    <Button size='xl' variant='secondary'>

                      <Mail className="w-8 h-8 text-slate-900 group-hover:text-primary transition-colors" />
                      Mail
                    </Button>
                  </a>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter">
                  Contact <span className="text-primary">Details</span>
                </h2>
                <div className="space-y-10">
                  <div className="flex gap-4 items-center pl-2">

                    <MapPin className="w-6 h-6 text-primary" />
                    <div className="space-y-1 pt-1">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Office Address</p>
                      <p className="text-lg font-bold text-slate-900 leading-snug">
                        {SITE_SETTINGS.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center pl-2">

                    <Phone className="w-6 h-6 text-primary" />
                    <div className="space-y-1 pt-1">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Phone Number</p>
                      <p className="text-lg font-bold text-slate-900">
                        {SITE_SETTINGS.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center pl-2">

                    <Mail className="w-6 h-6 text-primary" />
                    <div className="space-y-1 pt-1">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Email ID</p>
                      <p className="text-lg font-bold text-slate-900">
                        {SITE_SETTINGS.contactEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Card or Info */}
              {/* <div className="bg-slate-900 p-8 text-white relative overflow-hidden group shadow-[12px_12px_0px_0px_rgba(15,23,42,0.15)]">
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-4 uppercase italic">Working Hours</h3>
                  <div className="space-y-2 text-slate-400 font-medium text-sm">
                    <p className="flex justify-between"><span>Monday - Friday</span> <span>09:00 AM - 06:00 PM</span></p>
                    <p className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 02:00 PM</span></p>
                    <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
                  </div>
                </div>
                <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />
              </div> */}
            </div>

            {/* Right Column: Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-none -z-10" />
              <div className="bg-white border-2 border-slate-900 p-4 md:p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)]">
                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase italic tracking-tight">Send a <span className="text-primary">Message</span></h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="rounded-none border-slate-200 focus:border-slate-900 transition-colors h-12"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="rounded-none border-slate-200 focus:border-slate-900 transition-colors h-12"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="Project Discussion"
                      className="rounded-none border-slate-200 focus:border-slate-900 transition-colors h-12"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us about your project or inquiry..."
                      className="rounded-none border-slate-200 focus:border-slate-900 transition-colors min-h-[150px] resize-none"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-none h-14 font-black uppercase tracking-[0.2em] text-xs shadow-[8px_8px_0px_0px_rgba(15,23,42,0.2)] hover:translate-y-[-2px] transition-all"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Send Message</>
                    )}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div >
  )
}
