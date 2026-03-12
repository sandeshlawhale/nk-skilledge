import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

export const Route = createRootRouteWithContext()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Outlet />
    </div>
  )
}
