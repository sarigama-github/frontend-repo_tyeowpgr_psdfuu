import { useRef, useState, useEffect } from 'react'

export default function PhotoCanvas({ photo, people }) {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setSize({ w: rect.width, h: rect.width * 9/16 })
      }
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const getPerson = (id) => people.find(p => p._id === id)

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full aspect-video object-cover opacity-90"
        />

        {photo.tags?.map((t, idx) => {
          const left = `${t.x * 100}%`
          const top = `${t.y * 100}%`
          const person = getPerson(t.person_id)
          return (
            <div key={idx} className="absolute" style={{ left, top, transform: 'translate(-50%, -50%)' }}>
              <div className="group">
                <div className="w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-emerald-400/30 shadow-lg shadow-emerald-400/20"></div>
                <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 backdrop-blur text-white text-xs">
                    <div className="font-medium">{t.label || person?.full_name || 'Unknown'}</div>
                    {person?.relation && (
                      <div className="text-white/70">{person.relation}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-white/80 text-sm">{photo.title}</div>
        <div className="text-white/40 text-xs">Hover the dots to see who is who</div>
      </div>
    </div>
  )
}
