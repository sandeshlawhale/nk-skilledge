import { Link } from '@tanstack/react-router'
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
               <span className="font-heading font-black text-2xl tracking-tighter"><span className="text-sky-500">N</span><span className="text-orange-500">K</span><span className="text-slate-900">Skilledge.</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
              Empowering learners worldwide with cutting-edge courses and expert technology solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-sky-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-sky-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-sky-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold font-heading hover:text-sky-600 text-slate-900 mb-4 transition-colors">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li><Link to="/courses" className="hover:text-orange-500 transition-colors">Courses</Link></li>
              <li><Link to="/services" className="hover:text-orange-500 transition-colors">Services</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Mentorship</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-heading hover:text-sky-600 text-slate-900 mb-4 transition-colors">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-heading hover:text-sky-600 text-slate-900 mb-4 transition-colors">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} NKSkilledge. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Designed with ✨</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
