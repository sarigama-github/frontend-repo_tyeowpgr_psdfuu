export default function PersonCard({ person }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-4 flex items-center gap-3">
      <img
        src={person.photo_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(person.full_name)}`}
        alt={person.full_name}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="min-w-0">
        <div className="text-white font-medium truncate">{person.full_name}</div>
        {person.relation && <div className="text-white/60 text-sm truncate">{person.relation}</div>}
        {person.birth_year && <div className="text-white/40 text-xs">b. {person.birth_year}</div>}
      </div>
    </div>
  )
}
