import { 
  Briefcase, 
  GraduationCap, 
  Info, 
  Phone,
  LayoutDashboard,
  LogOut,
  User,
  Settings
} from 'lucide-react'

export const NAV_LINKS = [
  { 
    to: '/services', 
    label: 'Services', 
    icon: Briefcase 
  },
  { 
    to: '/training', 
    label: 'Training', 
    icon: GraduationCap 
  },
  { 
    to: '/about', 
    label: 'About', 
    icon: Info 
  },
  { 
    to: '/contact', 
    label: 'Contact', 
    icon: Phone 
  },
]

export const AUTH_LINKS = {
  ADMIN: {
    label: 'Admin Dashboard',
    to: '/admin',
    icon: LayoutDashboard
  },
  STUDENT: {
    label: 'My Training',
    to: '/students/my-training',
    icon: GraduationCap
  },
  LOGOUT: {
    label: 'Logout',
    icon: LogOut
  },
  PROFILE: {
    icon: User
  }
}
