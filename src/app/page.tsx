'use client'

import { useFieldBuilder } from '@/hooks/useFieldBuilder'
import { FieldList } from '@/components/FieldList'
import { ActionBar } from '@/components/ActionBar'
import { JsonOutput } from '@/components/JsonOutput'

export default function Home() {
  const {
    fields,
    jsonOutput,
    hasGenerated,
    addField,
    removeField,
    updateField,
    generateJson,
  } = useFieldBuilder()

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-zinc-100">JSON Schema Builder</h1>
          <p className="text-zinc-400 text-sm">
            Defina os campos, escolha os tipos e gere seu JSON.
          </p>
        </div>

        <div className="flex flex-col gap-6 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <FieldList
            fields={fields}
            onChange={updateField}
            onRemove={removeField}
          />
          <ActionBar
            onAdd={addField}
            onGenerate={generateJson}
          />
        </div>

        {hasGenerated && jsonOutput && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <JsonOutput json={jsonOutput} />
          </div>
        )}

      </div>
    </main>
  )
}