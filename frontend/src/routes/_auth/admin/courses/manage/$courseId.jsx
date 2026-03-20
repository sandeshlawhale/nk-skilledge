import { createFileRoute, useNavigate, Outlet, useChildMatches } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { ArrowLeft, Layout, Edit, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Modular Components
import ModulesTab from '@/components/admin/course/ModulesTab'
import CourseInfoTab from '@/components/admin/course/CourseInfoTab'
import EnrollmentsTab from '@/components/admin/course/EnrollmentsTab'
import AddLessonModal from '@/components/admin/course/AddLessonModal'




export const Route = createFileRoute('/_auth/admin/courses/manage/$courseId')({
  validateSearch: (search) => ({
    tab: (search.tab) || 'modules',
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
  const [editData, setEditData] = useState({
    title: '',
    description: [],
    thumbnail: '',
    price: 0,
    isFree: false,
    category: '',
    levels: 'Beginner',
    tags: '',
    duration: '',
    instructorName: '',
    whatYouWillLearn: [],
    requirements: []
  })

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
          description: Array.isArray(courseData.data.description) ? courseData.data.description : (courseData.data.description ? [courseData.data.description] : []),
          thumbnail: courseData.data.thumbnail || '',
          price: courseData.data.price || 0,
          isFree: courseData.data.isFree || false,
          category: courseData.data.category || '',
          levels: courseData.data.levels || 'Beginner',
          tags: (courseData.data.tags || []).join(', '),
          duration: courseData.data.duration || '',
          instructorName: courseData.data.instructorName || '',
          whatYouWillLearn: courseData.data.whatYouWillLearn || [],
          requirements: courseData.data.requirements || []
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
      const payload = {
        ...editData,
        description: editData.description.map(item => item.trim()).filter(item => item),
        tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        whatYouWillLearn: editData.whatYouWillLearn.map(item => item.trim()).filter(item => item),
        requirements: editData.requirements.map(item => item.trim()).filter(item => item),
        price: editData.isFree ? 0 : editData.price
      }

      const res = await authFetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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

  const handleListUpdate = (field, index, value) => {
    setEditData(prev => {
      const newList = [...prev[field]]
      newList[index] = value
      return { ...prev, [field]: newList }
    })
  }

  const handleAddListItem = (field) => {
    setEditData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const handleRemoveListItem = (field, index) => {
    setEditData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
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
      {/* Simple Header Section */}
      <div className="px-1">
        <button
          onClick={() => navigate({ to: '/admin/courses' })}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors font-black uppercase text-[9px] tracking-widest"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Courses
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 capitalize tracking-wide">
          {course?.title}
        </h1>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => navigate({ search: (prev) => ({ ...prev, tab: v }), replace: true })}
        className="w-full"
      >
        <TabsList className="bg-slate-100/50 p-1 rounded-none border-b border-slate-200 w-full justify-start h-12 mb-8">
          <TabsTrigger value="modules" className="rounded-xl px-8 py-2.5 font-bold">
            <Layout className="w-4 h-4 mr-2" /> Modules
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl px-8 py-2.5 font-bold">
            <Edit className="w-4 h-4 mr-2" /> Course Info
          </TabsTrigger>
          <TabsTrigger value="enrollments" className="rounded-xl px-8 py-2.5 font-bold" onClick={() => { if (!enrollmentsFetched) fetchEnrollments() }}>
            <Users className="w-4 h-4 mr-2" /> Enrollments
          </TabsTrigger>
        </TabsList>


        {/* Modules Tab */}
        <TabsContent value="modules">
          <ModulesTab 
            courseId={courseId}
            course={course}
            lessons={lessons}
            handleDeleteLesson={handleDeleteLesson}
            setShowAddLesson={setShowAddLesson}
          />
        </TabsContent>

        {/* Course Info Tab */}
        <TabsContent value="settings">
          <CourseInfoTab 
            course={course}
            editData={editData}
            setEditData={setEditData}
            isEditingInfo={isEditingInfo}
            setIsEditingInfo={setIsEditingInfo}
            isSaving={isSaving}
            handleUpdateCourse={handleUpdateCourse}
            handleListUpdate={handleListUpdate}
            handleAddListItem={handleAddListItem}
            handleRemoveListItem={handleRemoveListItem}
            handlePublishToggle={handlePublishToggle}
          />
        </TabsContent>

        {/* Enrollments Tab */}
        <TabsContent value="enrollments">
          <EnrollmentsTab 
            courseId={courseId}
            enrollments={enrollments}
            isLoadingEnrollments={isLoadingEnrollments}
            emailQuery={emailQuery}
            handleEmailSearch={handleEmailSearch}
            searchResults={searchResults}
            isSearching={isSearching}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            confirmStudent={confirmStudent}
            setConfirmStudent={setConfirmStudent}
            isEnrolling={isEnrolling}
            handleConfirmEnroll={handleConfirmEnroll}
            enrollError={enrollError}
            setEnrollError={setEnrollError}
            handleSelectStudent={handleSelectStudent}
            handleUnenroll={handleUnenroll}
            dropdownRef={dropdownRef}
          />
        </TabsContent>
      </Tabs>

      {/* Add Lesson Modal */}
      <AddLessonModal 
        showAddLesson={showAddLesson}
        setShowAddLesson={setShowAddLesson}
        newLesson={newLesson}
        setNewLesson={setNewLesson}
        handleCreateLesson={handleCreateLesson}
        isCreatingLesson={isCreatingLesson}
        lessonError={lessonError}
      />
    </div>
  )
}
