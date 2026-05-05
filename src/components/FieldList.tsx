'use client'

import { Field } from '@/types/field'
import { FieldRow } from './FieldRow'

interface FieldListProps {
  fields: Field[]
  onChange: (id: string, key: keyof Omit<Field, 'id' | 'error'>, value: string) => void
  onRemove: (id: string) => void
}

export function FieldList({ fields, onChange, onRemove }: FieldListProps) {
  if (fields.length === 0) {
    return (
      <p className="text-zinc-500 text-sm text-center py-6">
        Nenhum campo adicionado. Clique em "Adicionar campo" para começar.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.map(field => (
        <FieldRow
          key={field.id}
          field={field}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}