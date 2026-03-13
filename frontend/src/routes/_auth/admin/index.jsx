import { createFileRoute } from '@tanstack/react-router'
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react'

export const Route = createFileRoute('/_auth/admin/')({
  component: AdminOverview,
})

function AdminOverview() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-extrabold tracking-tight text-slate-900">Admin Overview</h1>
        <p className="text-slate-500 mt-1 font-medium">Welcome to the NKSkilledge admin control panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Students', value: '1,248', icon: Users, trend: '+12%', color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-100' },
          { label: 'Active Courses', value: '24', icon: BookOpen, trend: '+3%', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
          { label: 'Revenue (MTD)', value: '$12,450', icon: DollarSign, trend: '+18%', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Completion Rate', value: '68%', icon: TrendingUp, trend: '+5%', color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
        ].map((stat, i) => (
          <div key={i} className={`rounded-2xl border ${stat.border} bg-white shadow-sm p-6 relative overflow-hidden group transition-all hover:shadow-md`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110`}></div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="tracking-tight text-sm font-bold text-slate-500 uppercase">{stat.label}</h3>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-4xl font-heading font-black text-slate-900">{stat.value}</div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-sm">
          <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">Recent Registrations</h3>
          <p className="text-sm font-medium text-slate-500 mb-6">Latest students joining the platform.</p>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-700">S{i}</div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">Student Name {i}</div>
                    <div className="text-xs font-medium text-slate-500">student{i}@example.com</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">2 hours ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-8 shadow-sm">
          <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">Popular Courses</h3>
          <p className="text-sm font-medium text-slate-500 mb-6">Most enrolled courses this week.</p>
          <div className="space-y-4">
            {[
              { title: 'Advanced React Patterns', students: 342, bg: 'bg-sky-100' },
              { title: 'Fullstack Next.js Masterclass', students: 289, bg: 'bg-orange-100' },
              { title: 'UI/UX Design for Developers', students: 198, bg: 'bg-indigo-100' }
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-sky-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 ${course.bg} rounded-xl flex items-center justify-center font-bold text-slate-700`}>
                    C{i + 1}
                  </div>
                  <div className="font-bold text-sm text-slate-900">{course.title}</div>
                </div>
                <div className="text-sm font-black text-sky-500 bg-sky-50 px-3 py-1 rounded-full">{course.students}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
