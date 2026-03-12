import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit, Trash2, Video, FileText, CheckSquare, Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_auth/admin/courses')({
  component: AdminCourses,
})

const COURSES = [
  { id: 1, title: 'Advanced React Patterns & Architecture', status: 'Published', students: 342, lessons: 42, price: 99 },
  { id: 2, title: 'Fullstack Next.js Masterclass', status: 'Published', students: 289, lessons: 55, price: 149 },
  { id: 3, title: 'UI/UX Design for Developers', status: 'Draft', students: 0, lessons: 12, price: 79 },
  { id: 4, title: 'Go Microservices Boot-camp', status: 'Published', students: 156, lessons: 38, price: 199 },
]

function AdminCourses() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Course Management</h1>
          <p className="text-slate-500 mt-1">Create, edit, and organize your courses.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input className="pl-10" placeholder="Search courses..." />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">Filter Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => (
          <div key={course.id} className="rounded-xl border bg-white shadow-xs overflow-hidden flex flex-col group">
             <div className="h-40 bg-slate-100 relative group-hover:brightness-95 transition-all">
                <img src={`https://placehold.co/400x200/e2e8f0/4f46e5?text=Course+${course.id}`} alt="Course Cover" className="object-cover w-full h-full" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-slate-900 font-semibold border-0">
                    ${course.price}
                  </Badge>
                  <Badge className={course.status === 'Published' ? 'bg-green-500' : 'bg-amber-500'}>
                    {course.status}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 min-h-12">{course.title}</h3>
                
                <div className="flex content-center gap-4 mt-2 text-sm text-slate-500 mb-6">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{course.lessons}</span>
                    <span className="text-xs">Lessons</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                   <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{course.students}</span>
                    <span className="text-xs">Students</span>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
                   <Button variant="outline" className="w-full text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
                     <Edit className="mr-2 h-4 w-4" /> Edit
                   </Button>
                   <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 transition-colors">
                     <Trash2 className="mr-2 h-4 w-4" /> Delete
                   </Button>
                </div>
              </div>
          </div>
        ))}

        <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center p-6 text-center h-full min-h-[300px] cursor-pointer group">
          <div className="h-16 w-16 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors mb-4 border border-slate-200">
            <Plus className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-slate-900">Create New Course</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-[200px]">Start building your next educational masterpiece.</p>
        </div>
      </div>
    </div>
  )
}
