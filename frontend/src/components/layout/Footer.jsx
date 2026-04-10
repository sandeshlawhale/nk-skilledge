import { Link } from '@tanstack/react-router'
import { FOOTER_SOCIALS, FOOTER_LINKS } from '../../constants/footer'

export function Footer() {
  return (
    <footer className="bg-white text-slate-500 py-8 border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row: Logo, Socials, and Links */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="NK Skilledge" className="h-8 w-auto" />
              <span>NK SKILLEDGE</span>
            </Link>

            <div className="h-6 w-px bg-slate-500" />

            <div className="flex items-center gap-4">
              {FOOTER_SOCIALS.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-2 -m-2 text-slate-400 rounded-full transition-all duration-300 ${social.hoverColor} ${social.hoverBg}`}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <nav className="flex flex-col md:flex-row items-start md:items-center gap-x-8 gap-y-2 text-sm font-semibold text-slate-600 pl-4 md:pl-0">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`hover:text-primary transition-colors py-1 ${link.showBorder ? 'md:border-r-2 md:border-slate-500 md:pr-8' : ''
                  } ${link.label === 'Privacy Policy' || link.label === 'Terms & Conditions' ? 'whitespace-nowrap' : ''
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Row: Status and Copyright */}
        <div className="pt-4 border-t border-slate-50 flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-medium text-slate-400 sr-only">
            Developed and designed by <a href="https://sandeshlawhale.vercel.app/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Sandesh Lawhale</a>
          </p>
          <p className="text-sm font-medium text-slate-400">
            © {new Date().getFullYear()} NK Skilledge Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
