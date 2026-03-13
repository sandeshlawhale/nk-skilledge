import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const Route = createFileRoute('/_auth/admin/courses')({
  component: AdminCourses,
})

const INITIAL_COURSES = [
  { id: 1, title: 'Advanced React Patterns & Architecture', status: 'Published', students: 342, lessons: 42, price: 99 },
  { id: 2, title: 'Fullstack Next.js Masterclass', status: 'Published', students: 289, lessons: 55, price: 149 },
  { id: 3, title: 'UI/UX Design for Developers', status: 'Draft', students: 0, lessons: 12, price: 79 },
  { id: 4, title: 'Go Microservices Boot-camp', status: 'Published', students: 156, lessons: 38, price: 199 },
]

function AdminCourses() {
  const [courses, setCourses] = useState(INITIAL_COURSES)
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newCourse = {
      id: courses.length + 1,
      title: formData.get('title'),
      status: 'Published',
      students: 0,
      lessons: parseInt(formData.get('lessons') || '0', 10),
      price: parseInt(formData.get('price') || '0', 10),
    }
    setCourses([...courses, newCourse])
    setIsCreating(false)
  }

  if (isCreating) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-extrabold tracking-tight text-slate-900">Create New Course</h1>
            <p className="text-slate-500 mt-1 font-medium">Add details for your new educational content.</p>
          </div>
          <Button variant="ghost" onClick={() => setIsCreating(false)} className="rounded-full h-10 w-10 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100">
             <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <form onSubmit={handleCreate} className="space-y-8">
            <div className="border-2 border-dashed border-sky-200 bg-sky-50 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-sky-100/50 transition-colors group">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-sky-500 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="h-8 w-8" />
              </div>
              <h3 className="font-bold cursor-pointer text-slate-900">Upload Course Cover</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">PNG, JPG or WEBP (max. 5MB)</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-bold text-slate-700">Course Title <span className="text-red-500">*</span></Label>
                <Input id="title" name="title" placeholder="e.g. Complete Web Developer Zero to Mastery" required className="h-12 focus-visible:ring-sky-500 rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-bold text-slate-700">Course Description</Label>
                <Textarea id="description" name="description" placeholder="What will students learn in this course?" rows={5} className="focus-visible:ring-sky-500 resize-none rounded-xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="font-bold text-slate-700">Price ($) <span className="text-red-500">*</span></Label>
                  <Input id="price" name="price" type="number" placeholder="99" required className="h-12 focus-visible:ring-sky-500 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lessons" className="font-bold text-slate-700">Total Lessons</Label>
                  <Input id="lessons" name="lessons" type="number" placeholder="24" className="h-12 focus-visible:ring-sky-500 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
              <Button type="button" variant="ghost" onClick={() => setIsCreating(false)} className="font-bold h-12 px-6 rounded-full hover:bg-slate-100">
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 rounded-full shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                Publish Course
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight text-slate-900">Course Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Create, edit, and organize your courses.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-11 px-6 rounded-full shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
          <Plus className="mr-2 h-5 w-5" /> Add New Course
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input className="pl-10 h-11 bg-slate-50 border-transparent focus-visible:bg-white focus-visible:ring-sky-500 rounded-xl font-medium" placeholder="Search courses..." />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto h-11 rounded-xl font-bold border-slate-200 text-slate-700">Filter Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md hover:-translate-y-1">
             <div className="h-48 bg-sky-50 relative overflow-hidden">
                <img src={`https://placehold.co/400x200/e0f2fe/0ea5e9?text=Course+${course.id}`} alt="Course Cover" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-slate-900 font-bold border-0 shadow-xs px-3 py-1">
                    ${course.price}
                  </Badge>
                  <Badge className={`px-3 py-1 font-bold ${course.status === 'Published' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-amber-400 hover:bg-amber-500 text-amber-950'}`}>
                    {course.status}
                  </Badge>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 line-clamp-2 min-h-14">{course.title}</h3>
                
                <div className="flex items-center gap-6 mt-2 text-sm text-slate-500 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex flex-col items-center flex-1">
                    <span className="font-black text-slate-900 text-lg">{course.lessons}</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Lessons</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                   <div className="flex flex-col items-center flex-1">
                    <span className="font-black text-sky-600 text-lg">{course.students}</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Students</span>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
                   <Button variant="outline" className="w-full text-slate-700 font-bold rounded-xl h-11 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 transition-colors">
                     <Edit className="mr-2 h-4 w-4" /> Edit
                   </Button>
                   <Button variant="outline" onClick={() => setCourses(courses.filter(c => c.id !== course.id))} className="w-full text-red-600 font-bold rounded-xl h-11 border-red-100 hover:bg-red-50 hover:text-red-700 transition-colors">
                     <Trash2 className="mr-2 h-4 w-4" /> Delete
                   </Button>
                </div>
              </div>
          </div>
        ))}

        <div onClick={() => setIsCreating(true)} className="rounded-3xl border-2 border-dashed border-sky-200 bg-sky-50/50 hover:bg-sky-50 transition-colors flex flex-col items-center justify-center p-8 text-center h-[26rem] cursor-pointer group">
          <div className="h-20 w-20 rounded-full bg-white shadow-sm flex items-center justify-center text-sky-400 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300 mb-6 border border-sky-100">
            <Plus className="h-10 w-10 relative left-0.5" />
          </div>
          <h3 className="text-xl font-heading font-bold text-slate-900">Create New Course</h3>
          <p className="text-sm font-medium text-slate-500 mt-2 max-w-[200px]">Design your next educational masterpiece from scratch.</p>
        </div>
      </div>
    </div>
  )
}
