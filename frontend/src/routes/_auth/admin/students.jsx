import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Mail, ExternalLink, MoreVertical, Ban } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_auth/admin/students')({
  component: AdminStudents,
})

const STUDENTS = [
  { id: 'STU-4829', name: 'Sarah Jenkins', email: 'sarah.j@example.com', enrolled: 3, completed: 1, lastActive: '2 hours ago', status: 'Active' },
  { id: 'STU-9231', name: 'Michael Chang', email: 'm.chang@example.com', enrolled: 1, completed: 0, lastActive: '1 day ago', status: 'Active' },
  { id: 'STU-1044', name: 'Emma Watson', email: 'emma.w@example.com', enrolled: 4, completed: 4, lastActive: '5 mins ago', status: 'Active' },
  { id: 'STU-5522', name: 'David Smith', email: 'david.smith@example.com', enrolled: 2, completed: 0, lastActive: '3 weeks ago', status: 'Inactive' },
  { id: 'STU-1198', name: 'James Wilson', email: 'j.wilson99@example.com', enrolled: 1, completed: 0, lastActive: '2 days ago', status: 'Active' },
]

function AdminStudents() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-heading font-extrabold tracking-tight text-slate-900">Student Directory</h1>
           <p className="text-slate-500 mt-1 font-medium">Manage all enrolled learners on the platform.</p>
        </div>
        <Button className="bg-sky-500 hover:bg-sky-600 text-white font-bold h-11 px-6 rounded-full shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
          Export Data
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input className="pl-10 h-11 bg-slate-50 border-transparent focus-visible:bg-white focus-visible:ring-sky-500 rounded-xl font-medium" placeholder="Search by name, email, or ID..." />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto h-11 rounded-xl font-bold border-slate-200 text-slate-700">Filter By Course</Button>
          <Button variant="outline" className="w-full sm:w-auto h-11 rounded-xl font-bold border-slate-200 text-slate-700">Filter Status</Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
               <tr>
                 <th className="px-6 py-4 font-bold">Student</th>
                 <th className="px-6 py-4 font-bold text-center">Enrolled</th>
                 <th className="px-6 py-4 font-bold text-center">Completed</th>
                 <th className="px-6 py-4 font-bold text-center">Status</th>
                 <th className="px-6 py-4 font-bold text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STUDENTS.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {student.name.charAt(0)}{student.name.split(' ')[1]?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer">{student.name}</div>
                          <div className="text-slate-500 font-medium">{student.email}</div>
                          <div className="text-xs text-slate-400 mt-0.5">ID: {student.id} &bull; Active {student.lastActive}</div>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-md">{student.enrolled}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-md">{student.completed}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className={`px-2.5 py-1 font-bold shadow-none ${student.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-0'}`}>
                      {student.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-sky-600 hover:bg-sky-50 bg-white rounded-md shadow-xs border border-slate-200">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-600 hover:bg-orange-50 bg-white rounded-md shadow-xs border border-slate-200">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 bg-white rounded-md shadow-xs border border-slate-200">
                          <Ban className="h-4 w-4" />
                        </Button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm">
           <span className="text-slate-500 font-medium">Showing 1 to 5 of 1,248 students</span>
           <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-8 text-slate-500 font-bold" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="h-8 text-slate-700 font-bold hover:bg-sky-50 hover:text-sky-600">Next</Button>
           </div>
        </div>
      </div>
    </div>
  )
}
