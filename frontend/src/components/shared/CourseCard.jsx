import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'

export function CourseCard({ course, progress, linkTo, params, extraActions, metadata }) {
  if (!course) return null;

  const linkProps = params ? { to: linkTo, params } : { to: linkTo };

  return (
    <div className="group block space-y-3">
      <Link 
        {...linkProps}
        className="block cursor-pointer"
      >
        {/* Thumbnail Container */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 rounded-none shadow-none transition-shadow group-hover:shadow-lg">
          <img
            src={course.thumbnail || `https://placehold.co/600x400/e2e8f0/4f46e5?text=${course.title}`}
            alt={course.title}
            className="object-cover w-full h-full transition-transform duration-500"
          />
          
          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-none uppercase tracking-widest">
            {course.duration || 'Self-Paced'}
          </div>

          {/* RED PROGRESS BAR */}
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200/50">
              <div 
                className="h-full bg-red-600 transition-all duration-700" 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="space-y-1 px-1 mt-3">
          <h3 className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-2 uppercase italic leading-tight tracking-tight">
            {course.title}
          </h3>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                {course.instructorName || course.instructor || 'Elite Instructor'}
              </span>
              {course.askForPrice ? (
                <Badge className="bg-amber-100 text-amber-700 border-0 text-[8px] h-4 font-black uppercase tracking-widest px-1">Contact for Price</Badge>
              ) : (
                course.price === 0 && (
                  <Badge className="bg-green-100 text-green-700 border-0 text-[8px] h-4 font-black uppercase tracking-widest px-1">FREE</Badge>
                )
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <span>{course.lessonsCount || 0} Modules</span>
              <span className="h-1 w-1 bg-slate-300 rounded-none" />
              <span>{metadata || course.category || course.levels || 'Professional'}</span>
              {progress === 100 && (
                 <>
                   <span className="h-1 w-1 bg-slate-300 rounded-none" />
                   <span className="text-green-600">Completed</span>
                 </>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      {/* Extra Actions (e.g. Admin Delete) */}
      {extraActions && (
        <div className="px-1 flex gap-2">
           {extraActions}
        </div>
      )}
    </div>
  )
}
