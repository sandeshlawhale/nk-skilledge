import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  const { isAuthenticated, logout } = useAuthStore()

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b border-sky-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <span className="font-heading font-black text-2xl tracking-tighter"><span className="text-sky-500">N</span><span className="text-orange-500">K</span><span className="text-slate-900">Skilledge.</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-sm font-semibold text-slate-600 hover:text-sky-500 transition-colors">About</Link>
            <Link to="/services" className="text-sm font-semibold text-slate-600 hover:text-sky-500 transition-colors">Services</Link>
            <Link to="/courses" className="text-sm font-semibold text-slate-600 hover:text-sky-500 transition-colors">Courses</Link>
            <span className="text-sm font-semibold text-slate-600 cursor-pointer hover:text-sky-500 flex items-center transition-colors">
              Resources <span className="ml-1 text-[10px]">▼</span>
            </span>
          </nav>
          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-semibold text-slate-700 hover:text-sky-600 border border-slate-200 px-5 py-2.5 rounded-full transition-all hover:bg-slate-50 hover:border-sky-200">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-sky-500 px-2 py-2 transition-colors">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 rounded-full px-7 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5"
                >
                  Enroll now
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}
