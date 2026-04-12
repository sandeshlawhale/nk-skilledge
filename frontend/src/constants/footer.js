import { Github, Twitter, Linkedin } from 'lucide-react'

export const FOOTER_SOCIALS = [
  {
    label: 'Linkedin',
    href: '#',
    icon: Linkedin,
    hoverColor: 'hover:text-indigo-600',
    hoverBg: 'hover:bg-indigo-50/50'
  },
  {
    label: 'GitHub',
    href: '#',
    icon: Github,
    hoverColor: 'hover:text-indigo-600',
    hoverBg: 'hover:bg-slate-100/50'
  },
  {
    label: 'Twitter',
    href: '#',
    icon: Twitter,
    hoverColor: 'hover:text-sky-500',
    hoverBg: 'hover:bg-sky-50/50'
  },
]

export const FOOTER_LINKS = [
  { label: 'Courses', href: '/courses' },
  { label: 'Services', href: '/services' },
  // { label: 'Pricing', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact', showBorder: true },
  { label: 'Privacy Policy', href: '/' },
  { label: 'Terms & Conditions', href: '/' },
]
