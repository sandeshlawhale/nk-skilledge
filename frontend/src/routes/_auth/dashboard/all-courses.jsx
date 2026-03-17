import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Star, Info } from 'lucide-react'

export const Route = createFileRoute('/_auth/dashboard/all-courses')({
  component: AllCourses,
})

function AllCourses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses`)
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

    fetchCourses()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-geist">Explore Courses</h1>
        <p className="text-slate-500 mt-1">Discover our range of professional courses and master new skills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card key={course._id} className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden group-hover:cursor-pointer">
              <img 
                src={course.thumbnail || 'https://placehold.co/600x400/e2e8f0/4f46e5?text=Course'} 
                alt={course.title} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-white/90 backdrop-blur text-primary font-bold shadow-sm border-0">
                  {course.category || 'Professional'}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="p-5 pb-0">
              <div className="flex items-center gap-2 mb-2 text-primary font-semibold text-xs uppercase tracking-wider">
                <BookOpen className="h-3.5 w-3.5" />
                {course.lessonsCount || 0} Lessons
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                {course.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-slate-600 mt-2 min-h-12">
                {course.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-5 flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-4 w-4" />
                <span>{course.duration || 'Flexible'}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="h-4 w-4 fill-amber-500" />
                <span>4.8</span>
              </div>
            </CardContent>
            
            <CardFooter className="p-5 pt-0 mt-auto">
              <Button asChild className="w-full bg-slate-900 hover:bg-primary transition-all duration-300">
                <Link to={`/dashboard/course/${course._id}`} className="flex items-center justify-center gap-2">
                  View Details <Info className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium">No courses available at the moment.</p>
        </div>
      )}
    </div>
  )
}
