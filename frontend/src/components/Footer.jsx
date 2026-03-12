import { Link } from '@tanstack/react-router'
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600 mb-4">
              <BookOpen className="h-6 w-6" />
              <span>Premium LMS</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering learners worldwide with cutting-edge courses and expert mentorship.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Courses</Link></li>
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Services</Link></li>
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Mentorship</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Premium LMS Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Designed with ✨</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
