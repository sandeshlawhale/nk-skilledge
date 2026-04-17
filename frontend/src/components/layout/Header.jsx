import { Link } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { Menu, LogOut, User, LayoutDashboard, GraduationCap, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { NAV_LINKS, AUTH_LINKS } from '@/constants/header'

export function Header() {
  const { isAuthenticated, logout, user } = useAuthStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 relative">
        {/* Mobile: Hamburger Icon (Left) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] flex flex-col p-0" showCloseButton={false}>
              <SheetHeader className="p-4 border-b">
                <div className="flex items-center justify-between w-full">
                  <SheetTitle className="flex items-center gap-2">
                    <img src="/logo.png" alt="NK Skilledge" className="h-8 w-auto" />
                    <span className="font-bold text-xl tracking-tight">NK SKILLEDGE</span>
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500">
                      <X className="h-8 w-8" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="text-lg font-medium text-slate-600 hover:text-primary transition-all py-3 px-4 flex items-center gap-4 rounded-xl hover:bg-slate-50 border border-transparent"
                        activeProps={{
                          className: "bg-primary/10 text-primary border-primary/20",
                        }}
                      >
                        <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-inherit border border-slate-100/50">
                          <Icon className="h-5 w-5" />
                        </div>
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className="mt-auto flex flex-col">
                {isAuthenticated ? (
                  <>
                    {/* Dashboard link sticking at bottom, outside the profile card */}
                    <div className="px-4 pb-4">
                      <Link
                        to={user?.role === 'admin' ? AUTH_LINKS.ADMIN.to : AUTH_LINKS.STUDENT.to}
                        className="text-lg font-bold text-slate-700 hover:text-primary transition-all py-3 px-4 flex items-center gap-4 rounded-xl hover:bg-slate-50 border border-transparent"
                        activeProps={{
                          className: "bg-primary/10 text-primary border-primary/20",
                        }}
                      >
                        <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-inherit border border-slate-100/50">
                          {user?.role === 'admin' ? (
                            <LayoutDashboard className="h-5 w-5" />
                          ) : (
                            <GraduationCap className="h-5 w-5" />
                          )}
                        </div>
                        {user?.role === 'admin' ? AUTH_LINKS.ADMIN.label : AUTH_LINKS.STUDENT.label}
                      </Link>
                    </div>

                    {/* Profile Section Table (Name, Role, Logout) */}
                    <div className="p-6 border-t bg-slate-50/50">
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-white shadow-sm flex items-center justify-center text-primary">
                            <User className="h-6 w-6" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 truncate max-w-[140px]">
                              {user?.name || 'User'}
                            </span>
                            <span className="text-xs font-medium text-slate-500 capitalize">
                              {user?.role}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={logout}
                          title="Logout"
                          className="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100/50"
                        >
                          <LogOut className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-6 border-t bg-slate-50/50">
                    <Link
                      to="/login"
                      className="flex justify-center items-center w-full py-4 px-4 bg-primary text-white rounded-xl font-bold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                      Sign in to Account
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo and Name: Perfectly Centered on Mobile, Left-aligned on Desktop */}
        <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start">
          <Link 
            to="/" 
            className="text-xl font-bold text-slate-900 flex items-center gap-2 md:static absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 z-10"
          >
            <img src="/logo.png" alt="NK Skilledge" className="h-8 w-auto min-w-[32px]" />
            <span className="font-bold text-xl tracking-tight whitespace-nowrap">NK SKILLEDGE</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              activeProps={{
                className: "text-primary font-semibold"
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Tablet Enroll Now, Desktop Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Enroll Link: Hidden on Mobile (<640px), Visible on Tablet (sm to md) */}
          <Link
            to="/register"
            className="hidden sm:inline-flex md:hidden bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 transition-colors rounded-sm"
          >
            Enroll now
          </Link>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'admin' ? AUTH_LINKS.ADMIN.to : AUTH_LINKS.STUDENT.to}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 transition-colors hover:bg-slate-50 rounded-md"
                  activeProps={{
                    className: "bg-primary/5 text-primary border-primary/20"
                  }}
                >
                  {user?.role === 'admin' ? 'Dashboard' : 'My Training'}
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 px-6 py-2 transition-colors hover:bg-slate-50 rounded-md">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-sm rounded-md"
                >
                  Enroll now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
