import { createFileRoute, Link, useNavigate, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/register')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      const { user } = context.auth
      if (user?.role === 'admin') {
        throw redirect({ to: '/admin' })
      } else {
        throw redirect({ to: '/students/my-courses' })
      }
    }
  },
  component: Register,
})

function Register() {
  const navigate = useNavigate()
  const { register, isLoading, error, isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate({ to: '/admin', replace: true })
      } else {
        navigate({ to: '/students/my-courses', replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const firstName = e.target['first-name'].value
    const lastName = e.target['last-name'].value
    const email = e.target.email.value
    const password = e.target.password.value

    const result = await register({ 
      name: `${firstName} ${lastName}`, 
      email, 
      password 
    })

    if (result.success) {
      navigate({ to: '/students/my-courses' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/70 backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            {error ? (
              <span className="text-red-500 font-medium">{error}</span>
            ) : (
              'Enter your details below to create your account.'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" required disabled={isLoading} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required disabled={isLoading} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
