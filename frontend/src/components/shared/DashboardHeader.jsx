import { cn } from "@/lib/utils"
import { SidebarTrigger } from '@/components/ui/sidebar'

export function DashboardHeader({ title, subtitle, children, className }) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-1 mb-8", className)}>
      <div className="flex gap-2 items-start">
        {/* Sidebar Trigger - Only visible on mobile */}
        <SidebarTrigger className="-ml-2 h-12 w-12 text-slate-500 hover:text-slate-900 hover:bg-slate-100 md:hidden [&_svg]:size-7" />

        <div className="flex gap-3 items-stretch">
          {/* Vertical Pill / Accent */}
          <div className="hidden md:block w-1.5 bg-primary/20 rounded-full h-12" />

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-slate-900 capitalize leading-none">
              {title}
            </h1>
            {subtitle && (
              <p className="text-slate-500 mt-1.5 font-medium tracking-wide italic text-sm max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions - Desktop Rendering */}
      {children && (
        <div className="hidden md:flex items-center gap-2">
          {children}
        </div>
      )}

      {/* Actions - Mobile Floating Bar */}
      {children && (
        <div className="fixed bottom-10 left-6 right-6 z-40 md:hidden pointer-events-none">
          <div className="flex flex-col gap-3 w-full [&>*]:pointer-events-auto [&>*]:w-full [&>*]:shadow-2xl [&>*]:shadow-slate-900/20">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
