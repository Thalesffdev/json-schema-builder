'use client'

interface ActionBarProps {
  onAdd: () => void
  onGenerate: () => void
}

export function ActionBar({ onAdd, onGenerate }: ActionBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button
        onClick={onAdd}
        className="w-full sm:w-auto px-4 py-2 rounded-md border border-zinc-600 text-zinc-300 text-sm hover:border-emerald-500 hover:text-emerald-400 transition-colors"
      >
        + Adicionar campo
      </button>

      <button
        onClick={onGenerate}
        className="w-full sm:w-auto px-4 py-2 rounded-md bg-emerald-500 text-zinc-900 font-semibold text-sm hover:bg-emerald-400 transition-colors"
      >
        Gerar JSON
      </button>
    </div>
  )
}