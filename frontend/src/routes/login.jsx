import { createFileRoute, Link, useNavigate, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect } from 'react'

export const Route = createFileRoute('/login')({
  validateSearch: (search) => {
    return {
      redirect: search.redirect || undefined,
    }
  },
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      const { user } = context.auth
      if (search.redirect) {
        throw redirect({ to: search.redirect })
      }
      if (user?.role === 'admin') {
        throw redirect({ to: '/admin' })
      } else {
        throw redirect({ to: '/students/my-courses' })
      }
    }
  },
  component: Login,
})

function Login() {
  const navigate = useNavigate()
  const { redirect: redirectPath } = Route.useSearch()
  const { login, isLoading, error, isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      if (redirectPath) {
        navigate({ to: redirectPath, replace: true })
      } else if (user?.role === 'admin') {
        navigate({ to: '/admin', replace: true })
      } else {
        navigate({ to: '/students/my-courses', replace: true })
      }
    }
  }, [isAuthenticated, user, navigate, redirectPath])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const result = await login({ email, password })
    if (result.success) {
      // Get role from the store after login
      const user = useAuthStore.getState().user
      if (redirectPath) {
        navigate({ to: redirectPath })
      } else if (user?.role === 'admin') {
        navigate({ to: '/admin' })
      } else {
        navigate({ to: '/students/my-courses' })
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/70 backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Sign back in</CardTitle>
          <CardDescription className="text-center">
            {error ? (
              <span className="text-red-500 font-medium">{error}</span>
            ) : (
              'Enter your email and password to access your account.'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required disabled={isLoading} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Log in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-slate-500">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              search={{ redirect: redirectPath }}
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
