import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { PageHeader } from '../shared/PageHeader'
import { TrainingCard } from '../shared/TrainingCard'

export function Training() {
  const [training, setTraining] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedTraining = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses?featured=true&limit=4`)
        const data = await response.json()
        if (data.success) {
          setTraining(data.data)
        }
      } catch (error) {
        console.error('Error fetching featured training:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFeaturedTraining()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl py-12 px-4 mx-auto flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-none h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Featured Modules...</p>
      </div>
    )
  }

  if (training.length === 0) return null;

  return (
    <section className="w-full max-w-7xl py-12 px-4 mx-auto">
      <div className="mb-4 flex items-center gap-3 w-full justify-center">
        <div className="h-px w-8 bg-primary"></div>
        <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">Training</p>
      </div>

      <PageHeader
        title="Build Skills That Companies Actually Hire For."
        subtitle="Hands-on training programs designed with real projects, industry tools, and mentorship to help you become job-ready."
      >
        <Link to="/training">
          <Button variant="brutal-outline" size="xl">
            Browse all training
          </Button>
        </Link>
      </PageHeader>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${training.length < 4 ? 'lg:flex lg:justify-center' : 'lg:grid-cols-4'} gap-8 my-12`}>
        {training.map((item) => (
          <div key={item._id} className={training.length < 4 ? 'w-full sm:max-w-[340px]' : ''}>
            <TrainingCard
              training={item}
              linkTo="/training/$courseId"
              params={{ courseId: item._id }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
