import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { LayoutDashboard, BookOpen, Settings, LogOut, BarChart, Grid, Users } from 'lucide-react'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarNotch,
  useSidebar
} from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw Object.assign(new Error('Not authenticated'), {
        redirect: '/login',
        from: location.pathname
      })
    }
  },
  component: AuthLayout,
})

function DashboardSidebar() {
  const { user, logout } = useAuthStore()
  const { toggleSidebar } = useSidebar()
  const navigate = useNavigate()
  const router = useRouterState()
  const isAdmin = user?.role === 'admin'

  const studentNavigation = [
    { name: 'Dashboard', href: '/students', icon: LayoutDashboard },
    { name: 'My Courses', href: '/students/my-courses', icon: BookOpen },
    { name: 'All Courses', href: '/students/all-courses', icon: Grid },
  ]

  const adminNavigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'All Courses', href: '/admin/all-courses', icon: Grid },
    { name: 'Manage Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'All Users', href: '/admin/students', icon: Users },
  ]

  const navItems = isAdmin ? adminNavigation : studentNavigation

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 relative">
      <SidebarNotch />
      <SidebarHeader className="h-16 flex items-center border-b border-slate-200 p-0">
        <button
          onClick={() => toggleSidebar()}
          className="cursor-pointer flex items-center gap-2 px-4 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0 w-full h-full hover:bg-slate-50 transition-colors"
        >
          {/* Minimal Logo matching wireframe styling */}
          <img src="/logo.png" alt="NK Skilledge" className="h-6 w-6 shrink-0" />
          <span className="font-bold text-xl tracking-tight group-data-[state=collapsed]:hidden truncate">NK SKILLEDGE</span>
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            {isAdmin ? 'Administration' : 'Learning'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = (item.href === '/students' || item.href === '/admin')
                  ? router.location.pathname === item.href
                  : router.location.pathname === item.href || (item.href !== '/' && router.location.pathname.startsWith(item.href + '/'))
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                      <Link to={item.href} className="flex items-center gap-3 w-full">
                        <item.icon className={`h-4 w-4 ${isActive ? (isAdmin ? 'text-orange-500' : 'text-primary') : 'text-slate-500'}`} />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="w-full justify-start data-[state=open]:bg-slate-100 px-2">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm group-data-[collapsible=icon]:hidden ml-3 overflow-hidden text-left">
                <span className="font-bold text-slate-900 truncate w-full">{user?.name}</span>
                <span className="text-xs text-slate-500 truncate w-full">{user?.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" side="right">
            <DropdownMenuItem onClick={() => { logout(); navigate({ to: '/login' }) }} className="text-red-600 focus:text-red-600 cursor-pointer font-bold">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function AuthLayout() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login', replace: true })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <DashboardSidebar />

        <div className="flex flex-col flex-1 w-full min-w-0">
          {/* <header className="h-16 flex items-center px-4 border-b bg-white gap-4 sticky top-0 z-10 shrink-0">
            <SidebarTrigger className="-ml-2 text-slate-500 hover:text-slate-900" />
            <div className="ml-auto flex items-center space-x-4">
            </div>
          </header> */}

          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
