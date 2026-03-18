import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Search, Edit, Trash2, Upload, Image, BookOpen, Users, X, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_auth/admin/courses/')({
  component: AdminCourses,
})

function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '' })
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const fileInputRef = useRef(null)

  const navigate = useNavigate()

  const fetchCourses = async () => {
    try {
      const response = await authFetch(`${API_BASE_URL}/courses?status=all`)
      const data = await response.json()
      if (data.success) {
        setCourses(data.data)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setThumbnailFile(file)
    setThumbnailPreview(URL.createObjectURL(file))
  }

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    setCreateError('')

    if (!newCourse.title.trim() || !newCourse.description.trim()) {
      setCreateError('Title and description are required.')
      return
    }
    if (!thumbnailFile) {
      setCreateError('Please select a thumbnail image.')
      return
    }

    setIsCreating(true)
    try {
      const formData = new FormData()
      formData.append('title', newCourse.title)
      formData.append('description', newCourse.description)
      formData.append('price', newCourse.price || '0')
      formData.append('thumbnail', thumbnailFile)

      const res = await authFetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        // No Content-Type header — browser sets multipart boundary automatically
        body: formData,
      })
      const data = await res.json()

      if (data.success) {
        setShowCreateModal(false)
        resetForm()
        navigate({ to: `/admin/courses/manage/${data.data._id}` })
      } else {
        setCreateError(data.message || 'Failed to create course.')
      }
    } catch (err) {
      setCreateError('Something went wrong. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return
    try {
      await authFetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'DELETE',
      })
      setCourses(prev => prev.filter(c => c._id !== courseId))
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  const resetForm = () => {
    setNewCourse({ title: '', description: '', price: '' })
    setThumbnailFile(null)
    setThumbnailPreview(null)
    setCreateError('')
  }

  const openModal = () => {
    resetForm()
    setShowCreateModal(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-geist">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Course Management</h1>
          <p className="text-slate-500 mt-1 italic">Create, edit, and organize your educational content.</p>
        </div>
        <Button onClick={openModal} className="bg-slate-900 hover:bg-primary font-bold rounded-xl shadow-lg shadow-indigo-100">
          <Plus className="mr-2 h-4 w-4" /> Create New Course
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            className="pl-10 h-9 rounded-xl border-slate-200 focus:ring-primary shadow-none"
            placeholder="Search courses by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Badge variant="outline" className="h-9 px-4 rounded-xl border-slate-200 text-slate-500 font-medium">
            {courses.length} Total
          </Badge>
          <Badge variant="outline" className="h-9 px-4 rounded-xl border-slate-200 text-green-600 font-medium">
            {courses.filter(c => c.status === 'published').length} Published
          </Badge>
          <Badge variant="outline" className="h-9 px-4 rounded-xl border-slate-200 text-amber-600 font-medium">
            {courses.filter(c => c.status === 'draft').length} Draft
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course._id} className="overflow-hidden flex flex-col group border-0 shadow-sm bg-white/50 backdrop-blur-sm rounded-2xl gap-2">
            <div className="relative aspect-video overflow-hidden border-b border-slate-300">
              <img
                src={course.thumbnail || `https://placehold.co/600x400/e2e8f0/4f46e5?text=${encodeURIComponent(course.title)}`}
                alt={course.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge className="bg-white/90 backdrop-blur-md text-slate-900 font-bold border-0 shadow-sm">
                  ₹{course.price || 'FREE'}
                </Badge>
                <Badge className={course.status === 'published' ? 'bg-green-500 text-white font-bold border-0' : 'bg-amber-500 text-white font-bold border-0'}>
                  {course.status?.toUpperCase() || 'DRAFT'}
                </Badge>
              </div>
            </div>

            <CardHeader className="px-4 capitalize">
              <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                {course.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 py-0 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col p-3 bg-slate-50 border border-slate-100 transition-colors group-hover:bg-white group-hover:border-primary/20 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <BookOpen className="h-2.5 w-2.5" /> Lessons
                  </span>
                  <span className="text-xl font-bold text-slate-900">{course.lessonsCount || 0}</span>
                </div>
                <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100 transition-colors group-hover:bg-white group-hover:border-primary/20">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Users className="h-2.5 w-2.5" /> Students
                  </span>
                  <span className="text-xl font-bold text-slate-900">0</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-4 flex gap-2 border-t border-slate-50/50 mt-4">
              <Button variant="outline" onClick={() => navigate({ to: `/admin/courses/manage/${course._id}` })} className="flex-1 rounded-xl font-bold border-slate-200 hover:bg-slate-50 text-slate-600">
                <Edit className="mr-2 h-4 w-4" /> EDIT
              </Button>
              <Button variant="outline" onClick={() => handleDeleteCourse(course._id)} className="flex-1 rounded-xl font-bold border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> DELETE
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Dashed "New Course" card */}
        <div
          onClick={openModal}
          className="border-2 border-dashed border-slate-200 bg-slate-50/30 hover:bg-white hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center h-full min-h-[350px] cursor-pointer group rounded-3xl shadow-none hover:shadow-xl hover:shadow-indigo-50"
        >
          <div className="h-20 w-20 bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300 rounded-2xl border border-slate-100 group-hover:border-primary/20">
            <Plus className="h-10 w-10" />
          </div>
          <h3 className="font-bold text-xl text-slate-900 mt-6 font-geist">New Course</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-[220px] italic">Launch your next training program and empower your students.</p>
        </div>
      </div>

      {/* Create Course Modal — horizontal layout */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-3xl border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">

            {/* Header */}
            <div className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black uppercase italic tracking-tight">Create New Course</h2>
                <p className="text-slate-400 text-xs font-medium mt-0.5">A draft will be created — you can publish later.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleCreateCourse}>
              {/* Two-column body */}
              <div className="flex">

                {/* Left — Thumbnail */}
                <div className="w-64 shrink-0 p-6 border-r border-slate-100 bg-slate-50/50 flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Thumbnail</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden relative group"
                  >
                    {thumbnailPreview ? (
                      <>
                        <img src={thumbnailPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold uppercase tracking-wide">Change</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Image className="h-7 w-7 text-slate-300 mb-1.5" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Click to upload</span>
                        <span className="text-[10px] text-slate-300 mt-0.5">JPG, PNG, WEBP</span>
                      </>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    This image will be the course cover on the student portal.
                  </p>
                </div>

                {/* Right — Form fields */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Course Title</label>
                    <Input
                      required
                      placeholder="e.g. Advanced JavaScript Mastery"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Description</label>
                    <Textarea
                      required
                      placeholder="What will students learn in this course?"
                      className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white min-h-[110px] font-medium resize-none"
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price (₹) — leave 0 for free</label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    />
                  </div>

                  {createError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 font-medium">
                      {createError}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-1">
                    <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1 rounded-xl h-11 font-bold border-slate-200 uppercase tracking-tight">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isCreating} className="flex-1 bg-slate-900 hover:bg-primary rounded-xl h-11 font-black uppercase tracking-tight shadow-lg">
                      {isCreating ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</>
                      ) : (
                        <><Upload className="mr-2 h-4 w-4" /> Create Draft</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}

