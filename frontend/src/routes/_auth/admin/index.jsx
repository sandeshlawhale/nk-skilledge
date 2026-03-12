import { createFileRoute } from '@tanstack/react-router'
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react'

export const Route = createFileRoute('/_auth/admin/')({
  component: AdminOverview,
})

function AdminOverview() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Overview</h1>
        <p className="text-slate-500 mt-1">Platform metrics and quick stats.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Students', value: '1,248', icon: Users, trend: '+12%' },
          { label: 'Active Courses', value: '24', icon: BookOpen, trend: '+3%' },
          { label: 'Revenue (MTD)', value: '$12,450', icon: DollarSign, trend: '+18%' },
          { label: 'Completion Rate', value: '68%', icon: TrendingUp, trend: '+5%' },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border bg-white shadow-xs p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="tracking-tight text-sm font-medium text-slate-500">{stat.label}</h3>
              <stat.icon className="h-4 w-4 text-slate-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="rounded-xl border bg-white shadow-xs p-6">
          <h3 className="font-bold text-slate-900 mb-4">Recent Registrations</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">S{i}</div>
                  <div>
                    <div className="font-medium text-sm text-slate-900">Student Name {i}</div>
                    <div className="text-xs text-slate-500">student{i}@example.com</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">2 hours ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white shadow-xs p-6">
          <h3 className="font-bold text-slate-900 mb-4">Popular Courses</h3>
          <div className="space-y-4">
            {[
              { title: 'Advanced React Patterns', students: 342 },
              { title: 'Fullstack Next.js Masterclass', students: 289 },
              { title: 'UI/UX Design for Developers', students: 198 }
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 bg-slate-100 rounded-md overflow-hidden">
                    <img src={`https://placehold.co/100x60/e2e8f0/4f46e5?text=C${i + 1}`} className={`object-cover w-full h-full`} alt={`Course`} />
                  </div>
                  <div className="font-medium text-sm text-slate-900">{course.title}</div>
                </div>
                <div className="text-sm font-semibold text-indigo-600">{course.students}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
