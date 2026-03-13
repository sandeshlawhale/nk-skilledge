import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const success = login({ email, password, name: 'Demo User', role: 'student' })
    if(success) {
        navigate({ to: '/dashboard' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/70 backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold font-heading text-slate-900 tracking-tight text-center">Sign back in</CardTitle>
          <CardDescription className="text-center font-medium">
            Enter your email/username and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold">Email or Username</Label>
              <Input id="email" type="text" placeholder="admin or m@example.com" required className="focus-visible:ring-sky-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-bold">Password</Label>
                <Link to="/" className="text-sm font-bold text-sky-600 hover:text-orange-500 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="pass123" required className="focus-visible:ring-sky-500" />
            </div>
            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 shadow-sm transition-all hover:shadow-md text-white font-bold h-11">
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-sky-600 hover:text-orange-500 transition-colors">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
