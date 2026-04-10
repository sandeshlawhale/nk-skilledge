import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { PublicServiceCard } from '@/components/shared/PublicServiceCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Loader2, Briefcase } from 'lucide-react'

export const Route = createFileRoute('/services/')({
  component: PublicServicesIndex,
})

function PublicServicesIndex() {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services?active=true`)
        const data = await response.json()
        if (data.success) {
          setServices(data.data)
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl py-12 px-4 mx-auto font-geist">
        <PageHeader
          title="Our Professional Services"
          subtitle="Discover high-impact digital solutions built with cutting-edge technology and industry expertise."
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing Solutions...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {services.map((service) => (
                <PublicServiceCard key={service._id} service={service} />
              ))}
            </div>

            {services.length === 0 && (
              <div className="text-center py-24 bg-slate-50/50 border-2 border-dashed border-slate-200">
                <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">No Services Active</h3>
                <p className="text-slate-500 font-medium mt-2 italic text-sm">We are currently updating our professional offerings. Check back soon.</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
