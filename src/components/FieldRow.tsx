'use client'

import { Field, FieldType } from '@/types/field'

interface FieldRowProps {
  field: Field
  onChange: (id: string, key: keyof Omit<Field, 'id' | 'error'>, value: string) => void
  onRemove: (id: string) => void
}

const FIELD_TYPES: FieldType[] = ['string', 'number', 'boolean', 'null']

export function FieldRow({ field, onChange, onRemove }: FieldRowProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* Desktop: linha horizontal | Mobile: card com borda */}
      <div className="
        flex flex-col sm:flex-row sm:items-center gap-2
        sm:bg-transparent sm:border-0 sm:p-0 sm:rounded-none
        bg-zinc-800 border border-zinc-700 rounded-lg p-3
      ">

        {/* Linha superior no mobile: inputs + botão remover */}
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="nome do campo"
            value={field.name}
            onChange={e => onChange(field.id, 'name', e.target.value)}
            className="flex-1 sm:w-1/3 px-3 py-2 rounded-md border border-zinc-700 bg-zinc-900 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* Botão remover visível só no mobile aqui */}
          <button
            onClick={() => onRemove(field.id)}
            className="sm:hidden text-zinc-500 hover:text-red-400 transition-colors text-sm px-2 py-1 flex-shrink-0"
            aria-label="Remover campo"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="valor"
          value={field.value}
          onChange={e => onChange(field.id, 'value', e.target.value)}
          disabled={field.type === 'null'}
          className="w-full sm:w-1/3 px-3 py-2 rounded-md border border-zinc-700 bg-zinc-900 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={field.type}
            onChange={e => onChange(field.id, 'type', e.target.value)}
            className="flex-1 sm:w-36 px-3 py-2 rounded-md border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {FIELD_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Botão remover visível só no desktop aqui */}
          <button
            onClick={() => onRemove(field.id)}
            className="hidden sm:block text-zinc-500 hover:text-red-400 transition-colors text-sm px-2 py-2 flex-shrink-0"
            aria-label="Remover campo"
          >
            ✕
          </button>
        </div>

      </div>

      {field.error && (
        <span className="text-red-400 text-xs ml-1">{field.error}</span>
      )}
    </div>
  )
}