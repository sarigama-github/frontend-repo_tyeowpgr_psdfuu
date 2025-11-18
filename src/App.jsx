import { useEffect, useState } from 'react'
import Header from './components/Header'
import PhotoCanvas from './components/PhotoCanvas'
import PersonCard from './components/PersonCard'

function App() {
  const [people, setPeople] = useState([])
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [pRes, phRes] = await Promise.all([
        fetch(`${baseUrl}/api/persons`),
        fetch(`${baseUrl}/api/photos`)
      ])
      const [p, ph] = await Promise.all([pRes.json(), phRes.json()])
      setPeople(p)
      setPhotos(ph)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const seed = async () => {
    setSeeding(true)
    try {
      await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
      await fetchAll()
    } catch (e) {
      console.error(e)
    } finally {
      setSeeding(false)
    }
  }

  const heroBg = {
    backgroundImage:
      'radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.15) 0%, rgba(2,6,23,0) 60%), radial-gradient(40% 40% at 100% 0%, rgba(16,185,129,0.12) 0%, rgba(2,6,23,0) 50%), radial-gradient(30% 30% at 0% 50%, rgba(236,72,153,0.12) 0%, rgba(2,6,23,0) 50%)'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10" style={heroBg} />
      <Header onSeed={seed} seeding={seeding} />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <section className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Featured Photo</h2>
            <p className="text-white/60 text-sm">Add individuals as elegant overlay tags. Hover to reveal names and relations.</p>
            {loading ? (
              <div className="h-64 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
            ) : photos.length > 0 ? (
              <PhotoCanvas photo={photos[0]} people={people} />
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/60 text-sm">No photos yet. Use "Load Example Data" to see a demo.</div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">People</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
                ))
              ) : people.length > 0 ? (
                people.map(p => <PersonCard key={p._id} person={p} />)
              ) : (
                <div className="col-span-2 text-white/60 text-sm rounded-xl border border-white/10 bg-white/5 p-4">No people yet. Load the example data to get started.</div>
              )}
            </div>
          </div>
        </section>

        {photos.length > 1 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">More Photos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {photos.slice(1).map((ph) => (
                <PhotoCanvas key={ph._id} photo={ph} people={people} />
              ))}
            </div>
          </section>
        )}

        <footer className="pt-6 border-t border-white/10 text-white/50 text-sm flex items-center justify-between">
          <div>Designed with a sleek black theme</div>
          <div>
            Backend: <span className="font-mono text-white/70">{baseUrl}</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
