import { createFileRoute, Outlet, Link, useNavigate, useRouterState, redirect } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { LayoutDashboard, BookOpen, Settings, LogOut, BarChart, Grid, Users, Briefcase } from 'lucide-react'
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
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    const { user } = context.auth
    if (location.pathname.startsWith('/admin') && user?.role !== 'admin') {
      throw redirect({ to: '/students/my-training' })
    }
    if (location.pathname.startsWith('/students') && user?.role === 'admin') {
      throw redirect({ to: '/admin' })
    }
  },
  component: AuthLayout,
})

function DashboardSidebar() {
  const { user, logout } = useAuthStore()
  const { toggleSidebar, isMobile, setOpenMobile } = useSidebar()
  const navigate = useNavigate()
  const router = useRouterState()
  const isAdmin = user?.role === 'admin'

  const studentNavigation = [
    { name: 'My Training', href: '/students/my-training', icon: BookOpen },
    { name: 'All Training', href: '/students/all-training', icon: Grid },
  ]

  const adminNavigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    // { name: 'All Training', href: '/admin/all-training', icon: Grid },
    { name: 'Manage Training', href: '/admin/training', icon: BookOpen },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Team', href: '/admin/members', icon: Users },
    { name: 'All Users', href: '/admin/students', icon: BarChart },
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
            <SidebarMenu className={cn(isMobile && "gap-2")}>
              {navItems.map((item) => {
                const isActive = (item.href === '/students' || item.href === '/admin')
                  ? router.location.pathname === item.href
                  : router.location.pathname === item.href || (item.href !== '/' && router.location.pathname.startsWith(item.href + '/'))
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className={cn(isMobile && "h-11 px-4")}
                      onClick={() => isMobile && setOpenMobile(false)}
                    >
                      <Link to={item.href} className="flex items-center gap-3 w-full">
                        <item.icon className={cn(
                          isActive ? (isAdmin ? 'text-orange-500' : 'text-primary') : 'text-slate-500',
                          isMobile ? "h-5 w-5" : "h-4 w-4"
                        )} />
                        <span className={cn("font-medium", isMobile ? "text-base" : "text-sm")}>{item.name}</span>
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
            <SidebarMenuButton size="lg" className={cn("w-full justify-start data-[state=open]:bg-slate-100 px-2", isMobile ? "h-14" : "h-12")}>
              <Avatar className={cn("shrink-0", isMobile ? "h-10 w-10" : "h-8 w-8")}>
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className={cn("flex flex-col items-start group-data-[collapsible=icon]:hidden ml-3 overflow-hidden text-left", isMobile ? "text-base" : "text-sm")}>
                <span className="font-bold text-slate-900 truncate w-full">{user?.name}</span>
                <span className={cn("truncate w-full", isMobile ? "text-sm text-slate-500" : "text-xs text-slate-500")}>{user?.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56" side={isMobile ? "top" : "right"}>
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
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full bg-slate-50">
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
