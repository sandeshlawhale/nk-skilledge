import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  const { isAuthenticated, logout } = useAuthStore()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {/* Minimal Logo matching wireframe styling (Logo text for now) */}
            <span className="font-serif italic text-2xl tracking-tighter">Logo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">About</Link>
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Services</Link>
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Courses</Link>
            <span className="text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900 flex items-center">
              Resources <span className="ml-1 text-[10px]">▼</span>
            </span>
          </nav>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-md transition-colors hover:bg-slate-50">
                  Dashboard
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
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 px-6 py-2 transition-colors hover:bg-slate-50">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-black px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
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
