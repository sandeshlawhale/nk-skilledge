import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PlayCircle, Clock, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/dashboard/my-courses')({
  component: MyCourses,
})

const ENROLLED_COURSES = [
  {
    id: 'course-1',
    title: 'Advanced React Patterns & Architecture',
    instructor: 'Sarah Jenkins',
    progress: 35,
    totalLessons: 42,
    completedLessons: 15,
    lastAccessed: '2 hours ago',
    image: 'https://placehold.co/600x400/e2e8f0/4f46e5?text=React+Pro'
  },
  {
    id: 'course-2',
    title: 'Fullstack Next.js Masterclass',
    instructor: 'Michael Chen',
    progress: 8,
    totalLessons: 55,
    completedLessons: 4,
    lastAccessed: '3 days ago',
    image: 'https://placehold.co/600x400/e2e8f0/f97316?text=Next.js+Pro'
  },
  {
    id: 'course-4',
    title: 'Go Microservices Boot-camp',
    instructor: 'David Kim',
    progress: 100,
    totalLessons: 38,
    completedLessons: 38,
    lastAccessed: '1 week ago',
    image: 'https://placehold.co/600x400/e2e8f0/10b981?text=Go+Bootcamp'
  }
]

function MyCourses() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Learning</h1>
        <p className="text-slate-500 mt-1">Track your progress and continue where you left off.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ENROLLED_COURSES.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src={course.image} 
                alt={course.title} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 left-3">
                {course.progress === 100 ? (
                   <Badge className="bg-green-500 hover:bg-green-600 border-0 flex items-center gap-1">
                     <Award className="h-3 w-3" /> Completed
                   </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur font-semibold border-0">
                    In Progress
                  </Badge>
                )}
              </div>
            </div>
            
            <CardHeader className="p-5 pb-0">
              <h3 className="font-bold text-slate-900 line-clamp-2 min-h-[3rem] leading-tight">
                {course.title}
              </h3>
              <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Last accessed {course.lastAccessed}
              </p>
            </CardHeader>
            
            <CardContent className="p-5 flex-1">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-slate-600">{course.completedLessons} / {course.totalLessons} Lessons</span>
                    <span className={course.progress === 100 ? 'text-green-600' : 'text-indigo-600'}>
                      {course.progress}%
                    </span>
                  </div>
                  <Progress 
                    value={course.progress} 
                    className={`h-2 ${course.progress === 100 ? '[&>div]:bg-green-500' : ''}`} 
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-5 pt-0 border-t border-slate-100 mt-auto flex items-end">
              <Button asChild className={`w-full ${course.progress === 100 ? 'bg-slate-900 hover:bg-slate-800' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                <Link to={`/dashboard/course/${course.id}`} className="flex items-center justify-center">
                   {course.progress === 100 ? (
                     <>Review Course <FileText className="ml-2 h-4 w-4" /></>
                   ) : course.progress === 0 ? (
                     <>Start Course <PlayCircle className="ml-2 h-4 w-4" /></>
                   ) : (
                     <>Resume Course <PlayCircle className="ml-2 h-4 w-4" /></>
                   )}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
