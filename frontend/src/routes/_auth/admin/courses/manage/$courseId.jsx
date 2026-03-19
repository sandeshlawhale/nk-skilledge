import { createFileRoute, useNavigate, Outlet, useChildMatches } from '@tanstack/react-router'
import { useEffect, useState, useRef, useCallback } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Plus, Trash2, Video, ChevronRight, Layout, Edit, Save, X, BookOpen, PlusCircle, CheckCircle2, Loader2, Users, Search, UserCheck, UserX, Mail, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'




export const Route = createFileRoute('/_auth/admin/courses/manage/$courseId')({
  validateSearch: (search) => ({
    tab: (search.tab) || 'curriculum',
  }),
  component: CourseManager,
})


function CourseManager() {
  const { courseId } = Route.useParams()
  const { tab } = Route.useSearch()
  const navigate = useNavigate()
  const childMatches = useChildMatches()

  const hasChildRoute = childMatches.length > 0
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditingInfo, setIsEditingInfo] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editData, setEditData] = useState({ title: '', description: '', thumbnail: '' })

  // New Lesson State
  const [showAddLesson, setShowAddLesson] = useState(false)
  const [isCreatingLesson, setIsCreatingLesson] = useState(false)
  const [lessonError, setLessonError] = useState('')
  const [newLesson, setNewLesson] = useState({ title: '', content: '', videoUrl: '', pdfUrl: '' })

  // Enrollments State
  const [enrollments, setEnrollments] = useState([])
  const [isLoadingEnrollments, setIsLoadingEnrollments] = useState(false)
  const [enrollmentsFetched, setEnrollmentsFetched] = useState(false)
  const [emailQuery, setEmailQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [confirmStudent, setConfirmStudent] = useState(null) // student to enroll
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [enrollError, setEnrollError] = useState('')
  const searchDebounceRef = useRef(null)
  const dropdownRef = useRef(null)


  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [courseRes, lessonsRes] = await Promise.all([
        authFetch(`${API_BASE_URL}/courses/${courseId}`),
        authFetch(`${API_BASE_URL}/lessons/course/${courseId}?status=all`)
      ])
      const courseData = await courseRes.json()
      const lessonsData = await lessonsRes.json()

      if (courseData.success) {
        setCourse(courseData.data)
        setEditData({
          title: courseData.data.title,
          description: courseData.data.description,
          thumbnail: courseData.data.thumbnail || ''
        })
      }
      if (lessonsData.success) setLessons(lessonsData.data)
    } catch (error) {
      console.error('Error fetching course data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [courseId])

  const handleUpdateCourse = async () => {
    setIsSaving(true)
    try {
      const res = await authFetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      })
      const data = await res.json()
      if (data.success) {
        setCourse(data.data)
        setIsEditingInfo(false)
      }
    } catch (error) {
      console.error('Update failed', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublishToggle = async () => {
    const endpoint = course?.status === 'published' ? 'unpublish' : 'publish'
    try {
      const res = await authFetch(`${API_BASE_URL}/courses/${courseId}/${endpoint}`, {
        method: 'PUT',
      })
      const data = await res.json()
      if (data.success) setCourse(data.data)
    } catch (err) {
      console.error('Publish toggle failed', err)
    }
  }

  const handleCreateLesson = async (e) => {
    e.preventDefault()
    setLessonError('')
    setIsCreatingLesson(true)
    try {
      const res = await authFetch(`${API_BASE_URL}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newLesson.title,
          courseId: courseId,
          order: lessons.length,
          content: newLesson.content,
          videoUrl: newLesson.videoUrl,
        })
      })
      const data = await res.json()
      if (data.success) {
        setLessons([...lessons, data.data])
        setShowAddLesson(false)
        setNewLesson({ title: '', content: '', videoUrl: '', pdfUrl: '' })
      } else {
        setLessonError(data.message || 'Failed to create lesson.')
      }
    } catch (error) {
      setLessonError('Something went wrong. Please try again.')
    } finally {
      setIsCreatingLesson(false)
    }
  }

  const handleDeleteLesson = async (lessonId) => {
    if (!confirm('Delete this lesson?')) return
    try {
      await authFetch(`${API_BASE_URL}/lessons/${lessonId}`, {
        method: 'DELETE',
      })
      setLessons(prev => prev.filter(l => l._id !== lessonId))
    } catch (err) {
      console.error('Delete lesson failed', err)
    }
  }

  // Enrollment handlers
  const fetchEnrollments = async () => {
    setIsLoadingEnrollments(true)
    try {
      const res = await authFetch(`${API_BASE_URL}/enrollments/course/${courseId}`)
      const data = await res.json()
      if (data.success) setEnrollments(data.data)
    } catch (err) {
      console.error('Failed to fetch enrollments', err)
    } finally {
      setIsLoadingEnrollments(false)
      setEnrollmentsFetched(true)
    }
  }

  const handleEmailSearch = (value) => {
    setEmailQuery(value)
    setShowDropdown(false)
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
    if (value.trim().length < 2) {
      setSearchResults([])
      return
    }
    searchDebounceRef.current = setTimeout(async () => {
      setIsSearching(true)
      try {
        const res = await authFetch(`${API_BASE_URL}/users?email=${encodeURIComponent(value.trim())}`)
        const data = await res.json()
        if (data.success) {
          setSearchResults(data.data)
          setShowDropdown(true)
        }
      } catch (err) {
        console.error('Search failed', err)
      } finally {
        setIsSearching(false)
      }
    }, 300)
  }

  const handleSelectStudent = (student) => {
    setConfirmStudent(student)
    setShowDropdown(true)
    setSearchResults([])
    setEnrollError('')
  }


  const handleConfirmEnroll = async () => {
    if (!confirmStudent) return
    setIsEnrolling(true)
    setEnrollError('')
    try {
      const res = await authFetch(`${API_BASE_URL}/enrollments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: confirmStudent._id, courseId })
      })
      const data = await res.json()
      if (data.success) {
        setConfirmStudent(null)
        // Refresh enrollments list
        fetchEnrollments()
      } else {
        setEnrollError(data.message || 'Enrollment failed.')
      }
    } catch (err) {
      setEnrollError('Something went wrong. Please try again.')
    } finally {
      setIsEnrolling(false)
    }
  }

  const handleUnenroll = async (enrollmentId) => {
    try {
      await authFetch(`${API_BASE_URL}/enrollments/${enrollmentId}`, { method: 'DELETE' })
      setEnrollments(prev => prev.filter(e => e._id !== enrollmentId))
    } catch (err) {
      console.error('Unenroll failed', err)
    }
  }

  // If a child route (lesson) is active, render it instead of the course manager UI

  if (hasChildRoute) {
    return <Outlet />
  }

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-slate-500 font-medium animate-pulse">Loading course architecture...</p>
    </div>
  )

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-geist pb-20">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold mb-2 backdrop-blur-sm px-3 py-1">ADMINISTRATOR TOOL</Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase italic">
              {course?.title}
            </h1>
            <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
              Managing the structure, lessons, and assignments for this learning path.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePublishToggle}
              className={`border-slate-700 rounded-xl px-6 h-12 font-bold uppercase tracking-tight ${course?.status === 'published'
                ? 'text-amber-400 hover:bg-amber-500/10 border-amber-500/30'
                : 'text-green-400 hover:bg-green-500/10 border-green-500/30'
                }`}
            >
              {course?.status === 'published' ? 'Unpublish' : 'Publish Course'}
            </Button>
            <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-6 h-12 font-bold uppercase tracking-tight shadow-xl" onClick={() => setShowAddLesson(true)}>
              <PlusCircle className="mr-2 h-5 w-5" /> Add Lesson
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => navigate({ search: (prev) => ({ ...prev, tab: v }), replace: true })}
        className="w-full"
      >
        <TabsList className="bg-slate-100/50 p-1 rounded-none border-b border-slate-200 w-full justify-start h-12 mb-8">
          <TabsTrigger value="curriculum" className="rounded-xl px-8 py-2.5 font-bold">
            <Layout className="w-4 h-4 mr-2" /> Curriculum
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl px-8 py-2.5 font-bold">
            <Edit className="w-4 h-4 mr-2" /> Course Info
          </TabsTrigger>
          <TabsTrigger value="enrollments" className="rounded-xl px-8 py-2.5 font-bold" onClick={() => { if (!enrollmentsFetched) fetchEnrollments() }}>
            <Users className="w-4 h-4 mr-2" /> Enrollments
          </TabsTrigger>
        </TabsList>


        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
              <div className="h-2 w-8 bg-primary rounded-full"></div>
              Lessons &amp; Structure
            </h2>
            <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold bg-white">
              {lessons.length} Modules Total
            </Badge>
          </div>

          <div className="grid gap-4">
            {lessons.map((lesson, idx) => (
              <Card key={lesson._id} className="shadow-sm rounded-2xl overflow-hidden group hover:shadow-lg hover:translate-y-[-2px] transition-all bg-white border border-slate-100">
                <div className="flex items-center p-2 min-h-[90px]">
                  <div className="w-16 flex flex-col items-center justify-center border-r border-slate-50">
                    <span className="text-3xl font-black text-slate-200 group-hover:text-primary/20 transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1 px-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      {lesson.title}
                      {lesson.videoUrl && <Video className="h-4 w-4 text-indigo-400" />}
                    </h3>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
                        Lesson Module
                      </span>
                      <Badge className={lesson.status === 'published' ? 'bg-green-100 text-green-700 border-0 text-[10px] font-black uppercase' : 'bg-amber-100 text-amber-700 border-0 text-[10px] font-black uppercase'}>
                        {lesson.status || 'draft'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pr-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteLesson(lesson._id)}
                      className="h-10 w-10 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {/* Navigate to lesson detail */}
                    <div
                      onClick={() => navigate({ to: `/admin/courses/manage/${courseId}/lessons/${lesson._id}` })}
                      className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {lessons.length === 0 && (
              <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm mb-2">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Your curriculum is empty</h3>
                <p className="text-slate-500 max-w-sm">Every great course starts with a single lesson. Click the button above to begin building.</p>
                <Button onClick={() => setShowAddLesson(true)} className="bg-slate-900 rounded-xl px-8 h-12 font-bold uppercase transition-all hover:scale-105">Create First Lesson</Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Course Info Tab */}
        <TabsContent value="settings">
          {/* ... existing settings content ... */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
              <div className="h-2 w-8 bg-indigo-500 rounded-full"></div>
              Identity &amp; Information
            </h2>
            {!isEditingInfo ? (
              <Button onClick={() => setIsEditingInfo(true)} variant="outline" className="rounded-xl font-bold border-slate-200 bg-white">
                <Edit className="w-4 h-4 mr-2" /> Edit Details
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setIsEditingInfo(false)} variant="ghost" className="rounded-xl font-bold text-slate-500 hover:bg-slate-100">
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button onClick={handleUpdateCourse} disabled={isSaving} className="bg-primary rounded-xl font-bold shadow-lg shadow-primary/20">
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-sm rounded-3xl bg-white p-8 border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16"></div>
                <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Course Title</label>
                    {isEditingInfo ? (
                      <Input
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="text-2xl font-black h-16 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-none"
                      />
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 min-h-[64px] flex items-center group cursor-pointer hover:border-indigo-200 transition-all" onClick={() => setIsEditingInfo(true)}>
                        <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{course?.title}</h3>
                        <Edit className="ml-auto w-4 h-4 text-slate-300 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Long Description</label>
                    {isEditingInfo ? (
                      <Textarea
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="min-h-[220px] rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-none p-4 text-base leading-relaxed"
                      />
                    ) : (
                      <div className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 min-h-[160px] relative group cursor-pointer hover:border-indigo-200 transition-all font-medium text-slate-600 italic leading-relaxed" onClick={() => setIsEditingInfo(true)}>
                        {course?.description}
                        <Edit className="absolute top-4 right-4 w-4 h-4 text-slate-300 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-sm rounded-3xl bg-white overflow-hidden border border-slate-100">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-between">
                    Thumbnail
                    <Badge variant="outline" className="font-bold border-slate-200 text-[10px] h-5">JPG/PNG/WEBP</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="aspect-video rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden">
                    {course?.thumbnail ? (
                      <img src={course.thumbnail} className="w-full h-full object-cover" alt="Thumbnail" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-300">
                        <Video className="h-10 w-10 mb-2 opacity-20" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">No Media Set</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-bold text-slate-500">Status</span>
                      <Badge className={course?.status === 'published' ? 'bg-green-500 text-white font-black border-0' : 'bg-amber-500 text-white font-black border-0'}>
                        {course?.status?.toUpperCase() || 'DRAFT'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-bold text-slate-500">Created</span>
                      <span className="text-xs font-black text-slate-900">
                        {new Date(course?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handlePublishToggle}
                className={`w-full rounded-2xl h-14 font-black uppercase tracking-widest italic shadow-lg transition-all hover:translate-y-[-2px] ${course?.status === 'published'
                  ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200'
                  : 'bg-linear-to-r from-slate-900 to-indigo-950 hover:shadow-xl shadow-indigo-200'
                  }`}
              >
                {course?.status === 'published' ? 'Unpublish Course' : <>PUBLISH COURSE <CheckCircle2 className="ml-2 h-5 w-5" /></>}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Enrollments Tab */}
        <TabsContent value="enrollments" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
              <div className="h-2 w-8 bg-amber-500 rounded-full"></div>
              Student Enrollments
            </h2>

            {/* Search Box */}
            <div className="relative w-full md:w-80 group" ref={dropdownRef}>
              <div className="relative overflow-hidden rounded-none border border-slate-200 focus-within:border-slate-400 transition-all bg-white flex items-center px-3 h-10">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Invite student by email..."
                  className="bg-transparent border-0 outline-0 w-full font-bold text-xs text-slate-700 placeholder:text-slate-300"
                  value={emailQuery}
                  onChange={(e) => handleEmailSearch(e.target.value)}
                  onFocus={() => emailQuery.trim().length >= 2 && searchResults.length > 0 && setShowDropdown(true)}
                />
                {isSearching && <Loader2 className="w-3 h-3 animate-spin text-slate-400 ml-2" />}
              </div>

              {/* Dropdown Results / Confirmation Dialog */}
              {showDropdown && (searchResults.length > 0 || confirmStudent) && (
                <div className="absolute top-full mt-1 left-0 right-0 z-50 bg-white rounded-none shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                  {confirmStudent ? (
                    <div className="p-3 bg-slate-50/50">
                      <div className="space-y-1 mb-3">
                        <p className="text-[10px] font-black tracking-widest text-slate-300 uppercase">Confirm Access</p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-200 flex items-center justify-center text-slate-500 font-black text-[12px]">
                            {confirmStudent.name?.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-900 truncate uppercase tracking-tight">{confirmStudent.name}</p>
                            <p className="text-[9px] text-slate-400 truncate lowercase">{confirmStudent.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <Button
                          onClick={handleConfirmEnroll}
                          disabled={isEnrolling}
                          size="sm"
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-none h-8 text-[10px] font-black uppercase tracking-widest shadow-none"
                        >
                          {isEnrolling ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Confirm'}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setConfirmStudent(null)}
                          disabled={isEnrolling}
                          size="sm"
                          className="w-full rounded-none h-7 text-[9px] font-bold text-slate-400 hover:text-slate-600 hover:bg-white uppercase tracking-tight"
                        >
                          Cancel
                        </Button>
                      </div>

                      {enrollError && (
                        <p className="mt-2 text-[8px] text-red-500 font-black uppercase tracking-widest text-center">{enrollError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="p-1 max-h-60 overflow-y-auto">
                      {searchResults.map((user) => (
                        <div
                          key={user._id}
                          className="flex items-center justify-between p-2 hover:bg-slate-50 cursor-pointer group transition-colors"
                          onClick={() => handleSelectStudent(user)}
                        >
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            <div className="flex flex-col text-left">
                              <span className="text-[11px] font-bold text-slate-900 leading-none mb-0.5">{user.name}</span>
                              <span className="text-[10px] text-slate-400 leading-none">{user.email}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[8px] h-4 rounded-none border-slate-200 px-1 font-black uppercase text-slate-400">{user.role}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Enrolled Students Table */}
          <div className="bg-white rounded-none border border-slate-200 overflow-hidden">
            {isLoadingEnrollments && enrollments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <Loader2 className="h-6 w-6 animate-spin text-slate-200" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Querying Registry...</p>
              </div>
            ) : enrollments.length === 0 ? (
              <div className="p-16 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/20">
                <Users className="h-8 w-8 text-slate-200 mb-1" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Zero enrollments</h3>
                <p className="text-slate-400 text-[11px] max-w-xs font-medium uppercase tracking-tighter">Invite students using the search utility above.</p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50/80 border-b border-slate-200">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Student Identity</TableHead>
                    <TableHead className="h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Date</TableHead>
                    <TableHead className="h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Access</TableHead>
                    <TableHead className="h-10 px-6 text-right text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Manage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enroll) => (
                    <TableRow key={enroll._id} className="hover:bg-slate-50/50 border-slate-100 transition-colors">
                      <TableCell className="px-6 py-3">
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-slate-800 leading-tight">{enroll.userId?.name || 'Unknown User'}</span>
                          <span className="text-[10px] text-slate-400 font-medium leading-tight lowercase">{enroll.userId?.email || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        <span className="text-[11px] font-bold text-slate-500">
                          {new Date(enroll.enrolledAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        <Badge className="bg-transparent text-slate-500 border border-slate-200 rounded-none px-1.5 py-0 text-[8px] font-black uppercase tracking-widest shadow-none">
                          {enroll.accessType}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none text-slate-400">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-none border-slate-200 min-w-[150px] shadow-xl p-1">
                            <DropdownMenuGroup>
                              <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2 py-1.5">Action Menu</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-slate-100" />
                              <DropdownMenuItem
                                className="text-red-600 text-[11px] font-bold px-2 py-2 cursor-pointer focus:bg-red-50 focus:text-red-700 bg-red-50/20 whitespace-nowrap"
                                onClick={(e) => handleUnenroll(enroll._id)}
                              >
                                <UserX className="w-3.5 h-3.5 mr-2" />
                                Unenroll Student
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>

                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>


        </TabsContent>

      </Tabs>





      {/* Add Lesson Modal */}
      {showAddLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-900 text-white p-8">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-black uppercase italic tracking-tight">Add New Module</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowAddLesson(false)} className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <p className="text-slate-400 text-sm font-medium mt-1">Expanding the curriculum with deep-dive technical insights.</p>
            </CardHeader>
            <form onSubmit={handleCreateLesson}>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Lesson Title</label>
                  <Input
                    required
                    placeholder="e.g. Introduction to Advanced Paradigms"
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Video URL</label>
                    <Input
                      placeholder="Paste video URL..."
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 font-bold"
                      value={newLesson.videoUrl}
                      onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">PDF URL</label>
                    <Input
                      placeholder="Reference doc URL..."
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 font-bold"
                      value={newLesson.pdfUrl}
                      onChange={(e) => setNewLesson({ ...newLesson, pdfUrl: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Module Summary</label>
                  <Textarea
                    placeholder="What will students master in this lesson?"
                    className="rounded-xl border-slate-200 bg-slate-50 min-h-[100px] font-medium"
                    value={newLesson.content}
                    onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                  />
                </div>
                {lessonError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 font-medium">
                    {lessonError}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-8 pt-0 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddLesson(false)} className="flex-1 rounded-xl h-12 font-bold border-slate-200 uppercase tracking-tight">Cancel</Button>
                <Button type="submit" disabled={isCreatingLesson} className="flex-1 bg-slate-900 hover:bg-primary rounded-xl h-12 font-black uppercase tracking-tight shadow-xl shadow-slate-200">
                  {isCreatingLesson ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : 'Deploy Lesson'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
