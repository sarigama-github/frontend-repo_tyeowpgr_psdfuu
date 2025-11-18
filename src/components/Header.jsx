import { Camera, Users, Family, TreePine, PlusCircle } from 'lucide-react'

export default function Header({ onSeed, seeding }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
            <TreePine className="text-white/90" size={22} />
          </div>
          <div>
            <h1 className="text-white text-xl font-semibold tracking-tight">Family Atlas</h1>
            <p className="text-white/50 text-xs">Your lineage, beautifully mapped</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 text-white px-3 py-2 border border-white/10 transition-colors disabled:opacity-50"
          >
            <PlusCircle size={18} />
            {seeding ? 'Seeding…' : 'Load Example Data'}
          </button>
        </div>
      </div>
    </header>
  )
}
