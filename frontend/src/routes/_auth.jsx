import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { LayoutDashboard, BookOpen, Settings, LogOut, BarChart } from 'lucide-react'
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
  const navigate = useNavigate()
  const router = useRouterState()
  const isAdmin = user?.role === 'admin'

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', href: '/dashboard/my-courses', icon: BookOpen },
    { name: 'Settings', href: '#', icon: Settings },
  ]

  const adminNavigation = [
    { name: 'Admin Overview', href: '/admin', icon: BarChart },
    { name: 'Manage Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Students', href: '/admin/students', icon: Settings },
  ]

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-slate-200">
         <div className="flex items-center gap-2 px-4 w-full">
           {/* Logo Icon */}
           <div className="h-8 w-8 rounded-md bg-gradient-to-br from-sky-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-sm">
             <span className="font-heading">N</span>
           </div>
           <span className="font-heading font-black text-xl tracking-tighter truncate group-data-[collapsible=icon]:hidden">
             <span className="text-sky-500">N</span><span className="text-orange-500">K</span><span className="text-slate-900">Skilledge.</span>
           </span>
         </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = router.location.pathname === item.href
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                      <Link to={item.href} className="flex items-center gap-3">
                        <item.icon className={`h-4 w-4 ${isActive ? 'text-sky-600' : 'text-slate-500'}`} />
                        <span className={isActive ? 'font-bold text-sky-700' : 'font-medium text-slate-600'}>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="font-bold text-orange-600/80">Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavigation.map((item) => {
                  const isActive = router.location.pathname === item.href || router.location.pathname.startsWith(item.href + '/')
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                        <Link to={item.href} className="flex items-center gap-3">
                          <item.icon className={`h-4 w-4 ${isActive ? 'text-orange-600' : 'text-slate-500'}`} />
                          <span className={isActive ? 'font-bold text-orange-700' : 'font-medium text-slate-600'}>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 p-4">
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="w-full justify-start data-[state=open]:bg-slate-100">
                <Avatar className="h-8 w-8 shrink-0 rounded-md">
                  <AvatarFallback className="bg-sky-100 text-sky-700 font-bold rounded-md">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm group-data-[collapsible=icon]:hidden ml-2">
                  <span className="font-medium text-slate-900">{user?.name}</span>
                  <span className="text-xs text-slate-500 truncate w-[140px]">{user?.email}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => { logout(); navigate({ to: '/login' }) }} className="text-red-600 focus:text-red-600 cursor-pointer">
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
          <header className="h-16 flex items-center px-4 border-b bg-white gap-4 sticky top-0 z-10 shrink-0">
            <SidebarTrigger className="-ml-2 text-slate-500 hover:text-slate-900" />
            <div className="ml-auto flex items-center space-x-4">
              {/* Optional Header Actions here */}
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
