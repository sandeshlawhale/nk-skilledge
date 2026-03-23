import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import {
  CheckCircle2, Lock, LayoutList, MessageSquare,
  PhoneCall, Award, ArrowLeft, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/_public/courses/$courseId')({
  component: PublicCourseDetails,
})

function PublicCourseDetails() {
  const { courseId } = useParams({ from: '/courses/$courseId' })
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/courses/${courseId}`),
          fetch(`${API_BASE_URL}/lessons/course/${courseId}?status=published`),
        ])

        const cData = await courseRes.json()
        const lData = await lessonsRes.json()

        if (cData.success) setCourse(cData.data)
        if (lData.success) setLessons(lData.data)

        // Check enrollment if logged in
        if (isAuthenticated && user?._id) {
          const enrollRes = await authFetch(`${API_BASE_URL}/enrollments/user/${user._id}`)
          const eData = await enrollRes.json()
          if (eData.success) {
            const hasEnrollment = eData.data.some(e => {
              const id = typeof e.courseId === 'object' ? e.courseId._id : e.courseId
              return id === courseId
            })
            setIsEnrolled(hasEnrollment)
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [courseId, isAuthenticated, user?._id])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Assembling Curriculum...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <h2 className="text-2xl font-black text-slate-900 uppercase italic">Course Not Found</h2>
        <Button onClick={() => navigate({ to: '/courses' })}>Browse Catalog</Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl py-12 px-4 mx-auto font-geist">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content: Course Details */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <button onClick={() => navigate({ to: '/courses' })} className='flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase text-[9px] tracking-widest'>
              <ArrowLeft className="h-3 w-3" /> Back to Catalog
            </button>

            <div className="relative aspect-video rounded-none overflow-hidden bg-slate-100 shadow-md">
              <img src={course?.thumbnail || 'https://placehold.co/1200x600/e2e8f0/4f46e5?text=Course'} className='w-full h-full object-cover' alt={course?.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {course?.category && <Badge className="bg-primary text-white font-black px-3 py-1 rounded-none border-0 uppercase text-[9px] tracking-widest">
                    {course?.category}
                  </Badge>}
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 font-black px-3 py-1 rounded-none uppercase text-[9px] tracking-widest backdrop-blur-sm">
                    {course?.levels || 'All Levels'}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter max-w-2xl drop-shadow-xl">
                  {course?.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-indigo-400 border-2 border-white/20 flex items-center justify-center text-[10px] font-black text-white uppercase shadow-lg">
                    {course?.instructorName?.substring(0, 2).toUpperCase() || 'EL'}
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">
                    By {course?.instructorName || 'Elite Instructor'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-none p-8 border border-slate-200 shadow-none space-y-8">
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 mb-4">
                  <div className="h-1 w-4 bg-primary rounded-none"></div> About this Course
                </h2>
                <div className="space-y-4">
                  {Array.isArray(course?.description) ? (
                    course.description.map((para, i) => (
                      <p key={i} className="text-slate-600 leading-relaxed font-medium text-sm">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-600 leading-relaxed font-medium text-sm">
                      {course?.description || 'Learn advanced concepts and industry best practices in this comprehensive professional curriculum.'}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-slate-50">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                  <span className="text-sm font-bold text-slate-900 uppercase">{course?.duration || "Self-Paced"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Focus Area</span>
                  <span className="text-sm font-bold text-slate-900 uppercase">{course?.category || "General"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificate</span>
                  <span className="text-sm font-bold text-slate-900 uppercase">Included</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expertise</span>
                  <span className="text-sm font-bold text-slate-900 uppercase">{course?.levels || "All Levels"}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="h-3 w-1 bg-primary"></div> Goals
                  </h3>
                  <ul className="space-y-3">
                    {course?.whatYouWillLearn?.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    )) || <li className="text-sm text-slate-400 italic">No specific goals listed.</li>}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="h-3 w-1 bg-slate-400"></div> Requirements
                  </h3>
                  <ul className="space-y-3">
                    {course?.requirements?.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                        {item}
                      </li>
                    )) || <li className="text-sm text-slate-400 italic">No special requirements.</li>}
                  </ul>
                </div>
              </div>

              {course?.tags?.length > 0 && (
                <div className="pt-6 border-t border-slate-50">
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="border-slate-100 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-none">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                <LayoutList className="h-6 w-6 text-primary" /> Curriculum Preview
              </h2>
              <div className="grid gap-3">
                {lessons.map((lesson, idx) => (
                  <div key={lesson._id} className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-none group hover:bg-white hover:border-slate-200 transition-all">
                    <div className="h-8 w-8 rounded-none bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-700 uppercase italic leading-tight group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">Lesson {idx + 1}</p>
                    </div>
                    <Lock className="h-3.5 w-3.5 text-slate-300" />
                  </div>
                ))}
                {lessons.length === 0 && <p className="text-sm text-slate-400 italic p-4 text-center border border-dashed border-slate-200">Curriculum details are being updated.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Pricing & Enrollment */}
        <aside className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-10 space-y-6">
          <Card className="border border-slate-200 rounded-none overflow-hidden bg-white text-slate-900">
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Lifetime Enrollment</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black italic tracking-tighter text-slate-900">
                    {course?.price ? `₹${course.price}` : `Price TBD`}
                  </span>
                  {course?.price > 0 && <span className="text-slate-400 text-xs line-through font-bold">₹{(course.price * 1.5).toFixed(0)}</span>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Instant access to all {lessons.length} modules</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <Award className="h-4 w-4 text-primary" />
                  <span>Professional certification on completion</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>Direct community access & 1:1 support</span>
                </div>
              </div>

              {isEnrolled ? (
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs h-12 rounded-none shadow-none"
                  onClick={() => navigate({ to: `/students/course/${courseId}` })}
                >
                  Go to Course
                </Button>
              ) : !course?.price ? (
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-none space-y-3">
                  <p className="text-[10px] font-bold text-center text-slate-500 uppercase tracking-widest leading-relaxed">
                    Course price is not yet decided. Please contact our admissions team to enroll.
                  </p>
                  <Button className="w-full bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs h-12 rounded-none shadow-none" onClick={() => navigate({ to: "/login", search: { redirect: window.location.pathname } })}>
                    <PhoneCall className="h-4 w-4 mr-2" /> Contact Admin
                  </Button>
                </div>
              ) : (
                <Button className="w-full bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs h-12 rounded-none shadow-none" onClick={() => navigate({ to: "/login", search: { redirect: window.location.pathname } })}>
                  Enroll Now
                </Button>
              )}

              <div className="pt-4 text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">
                  Trusted by 5,000+ Students globally
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
