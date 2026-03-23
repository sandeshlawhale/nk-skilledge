import { cn } from "@/lib/utils"

/**
 * PageHeader component for dashboard pages.
 * 
 * @param {Object} props
 * @param {string} props.title - The main heading title.
 * @param {string} [props.subtitle] - The optional subheading text.
 * @param {React.ReactNode} [props.children] - Action buttons or other content to display on the right.
 * @param {string} [props.className] - Additional class names for the container.
 */
export function PageHeader({ title, subtitle, children, className }) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-1", className)}>
      <div className="flex gap-2 items-stretch">
        {/* Vertical Pill */}
        <div className="w-1.5 bg-primary/20 rounded-full" />

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-slate-900 capitalize leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-600 mt-1.5 font-normal tracking-wider italic text-sm max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Actions / Right Side Content (passed as children) */}
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  )
}
