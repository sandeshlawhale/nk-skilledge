import { createFileRoute, Outlet, Link, useParams, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { PlayCircle, CheckCircle, Lock, LayoutList, MessageSquare, PhoneCall, Play, Info, Clock, Award } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_auth/students/course/$courseId')({
  component: CourseLayout,
})

function CourseLayout() {
  const { courseId } = useParams({ from: '/_auth/students/course/$courseId' })
  const { user } = useAuthStore()
  const [course, setCourse] = useState(null)
  const [enrollment, setEnrollment] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await fetch(`${API_BASE_URL}/courses/${courseId}`)
        const courseData = await courseRes.json()
        if (courseData.success) setCourse(courseData.data)

        if (user?._id) {
          const enrollmentRes = await fetch(`${API_BASE_URL}/enrollments/user/${user._id}`)
          const enrollmentData = await enrollmentRes.json()
          if (enrollmentData.success) {
            const found = enrollmentData.data.find(
              (e) => e.courseId._id === courseId || e.courseId === courseId
            )
            setEnrollment(found)
          }
        }
      } catch (error) {
        console.error('Error fetching course data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [courseId, user?._id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const isEnrolled = !!enrollment

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 font-geist">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {isEnrolled ? (
          <Outlet />
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            <div className="aspect-video relative overflow-hidden bg-slate-100">
              <img
                src={course?.thumbnail || 'https://placehold.co/1200x600/e2e8f0/4f46e5?text=Course+Preview'}
                alt={course?.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer">
                  <Play className="h-10 w-10 fill-white" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 border-0">
                  {course?.category || 'Professional'}
                </Badge>
                <span className="text-slate-400 text-sm flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {course?.duration || '12 weeks'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-6">{course?.title}</h1>
              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-slate-800 mb-3">About this Course</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {course?.description || 'Master the skills needed to excel in this field with our comprehensive professional course.'}
                </p>
                <h3 className="text-xl font-bold text-slate-800 mb-3">What you'll learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 list-none p-0">
                  {[
                    'Professional industry-standard techniques',
                    'Hands-on practical assignments',
                    'Lifetime access to course materials',
                    'Dedicated support and community access',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-[400px] shrink-0 space-y-6">
        {/* Progress / CTA */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          {isEnrolled ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Your Progress</h3>
                <span className="text-indigo-600 font-bold">{enrollment?.progress || 0}%</span>
              </div>
              <Progress value={enrollment?.progress || 0} className="h-2.5 bg-slate-100" />
              <p className="text-xs text-slate-500 text-center">
                {Math.floor((course?.lessonsCount || 0) * (enrollment?.progress || 0) / 100)} of {course?.lessonsCount || 0} lessons completed
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center pb-4 border-b border-slate-100">
                <span className="text-3xl font-bold text-slate-900">₹{course?.price || '29,999'}</span>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">One-time payment</p>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-slate-900 hover:bg-primary font-bold py-6 rounded-xl shadow-lg shadow-indigo-100">
                  <PhoneCall className="mr-2 h-5 w-5" /> Contact to Enroll
                </Button>
                <p className="text-[11px] text-center text-slate-400">
                  Get in touch with our team for enrollment details and payment options.
                </p>
              </div>
              <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-tight mb-2 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5" /> Course Includes
                </h4>
                <ul className="text-xs text-indigo-800 space-y-2">
                  <li className="flex items-center gap-2"><PlayCircle className="h-3.5 w-3.5 opacity-70" /> {course?.lessonsCount || '42'} Full HD Lessons</li>
                  <li className="flex items-center gap-2"><MessageSquare className="h-3.5 w-3.5 opacity-70" /> 1-on-1 Mentorship</li>
                  <li className="flex items-center gap-2"><Award className="h-3.5 w-3.5 opacity-70" /> Certificate of Completion</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Lesson Sidebar */}
        <CourseSidebar courseId={courseId} isEnrolled={isEnrolled} />
      </aside>
    </div>
  )
}

function CourseSidebar({ courseId, isEnrolled }) {
  const [lessons, setLessons] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/lessons/course/${courseId}?status=published`)
        const data = await res.json()
        if (data.success) setLessons(data.data)
      } catch (err) {
        console.error('Error fetching lessons:', err)
      } finally {
        setIsFetching(false)
      }
    }
    fetchLessons()
  }, [courseId])

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col max-h-[600px]">
      <div className="p-5 border-b bg-slate-50/50 flex items-center justify-between shrink-0">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <LayoutList className="h-5 w-5 text-indigo-600" /> Course Content
        </h3>
        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight">
          {lessons.length} Lessons
        </Badge>
      </div>

      <div className="overflow-y-auto flex-1 p-2">
        {isFetching ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          </div>
        ) : lessons.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-400 italic">No published lessons yet.</div>
        ) : (
          <>
            {lessons.map((lesson, i) =>
              !isEnrolled ? (
                <div
                  key={lesson._id}
                  className="flex items-start gap-4 p-4 rounded-xl opacity-60 cursor-not-allowed select-none"
                >
                  <Lock className="h-5 w-5 text-slate-300 mt-0.5 shrink-0" />
                  <h4 className="text-sm font-bold text-slate-800 truncate">
                    {(i + 1).toString().padStart(2, '0')}. {lesson.title}
                  </h4>
                </div>
              ) : (
                <Link
                  key={lesson._id}
                  to={`/students/course/${courseId}/lesson/${lesson._id}`}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-indigo-50/50 cursor-pointer transition-all group block"
                >
                  <PlayCircle className="h-5 w-5 text-indigo-400 group-hover:text-primary transition-colors mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-primary transition-colors">
                      {(i + 1).toString().padStart(2, '0')}. {lesson.title}
                    </h4>
                    {lesson.content && (
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{lesson.content}</p>
                    )}
                  </div>
                </Link>
              )
            )}
            {!isEnrolled && (
              <div className="p-4 text-center">
                <p className="text-xs text-slate-400 italic">Enroll to unlock all lessons</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
