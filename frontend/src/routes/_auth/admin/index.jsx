import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Users, BookOpen, DollarSign, TrendingUp, Clock, UserPlus, CreditCard, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/PageHeader'

export const Route = createFileRoute('/_auth/admin/')({
  component: AdminOverview,
})

function AdminOverview() {
  const [stats, setStats] = useState({
    users: [],
    courses: [],
    isLoading: true
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          authFetch(`${API_BASE_URL}/users`),
          authFetch(`${API_BASE_URL}/courses`)
        ])
        const usersData = await usersRes.json()
        const coursesData = await coursesRes.json()

        setStats({
          users: usersData.success ? usersData.data : [],
          courses: coursesData.success ? coursesData.data : [],
          isLoading: false
        })
      } catch (error) {
        console.error('Error fetching admin overview:', error)
        setStats(prev => ({ ...prev, isLoading: false }))
      }
    }

    fetchStats()
  }, [])

  if (stats.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const statCards = [
    { label: 'Total Students', value: stats.users.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Courses', value: stats.courses.length, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Revenue', value: '₹0', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'New Signups', value: stats.users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: UserPlus, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  return (
    <div className="space-y-10 max-w-7xl mx-auto font-geist">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back. Here's what's happening on your platform today."
      >
        <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Health: Optimal</span>
        </div>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <Card key={i} className="border-0 shadow-sm rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-0">Realtime</Badge>
              </div>
              <div className="text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-0 shadow-sm rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="p-8 border-b border-slate-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Recent Registrations
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary">
                <Link to="/admin/students">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {stats.users.slice(0, 5).map((user) => (
                <div key={user._id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-slate-100 group-hover:border-primary/20 transition-colors">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">{user.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{user.name}</div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-[10px] font-black text-slate-300 uppercase italic flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                    <Badge variant="outline" className="mt-1 text-[9px] h-4 font-bold uppercase tracking-widest border-slate-100 text-slate-400">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              ))}
              {stats.users.length === 0 && (
                <div className="text-center py-10 italic text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                  No recent signups found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" /> Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {stats.courses.slice(0, 5).map((course) => (
                <div key={course._id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-14 w-24 rounded-xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100 group-hover:border-primary/30 group-hover:shadow-lg transition-all">
                    <img src={course.thumbnail || `https://placehold.co/100x60/e2e8f0/4f46e5?text=C`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" alt={course.title} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-primary transition-colors uppercase tracking-tight">{course.title}</div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{course.lessonsCount || 0} Lessons</div>
                  </div>
                </div>
              ))}
              {stats.courses.length === 0 && (
                <div className="text-center py-10 italic text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                  No active courses yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
