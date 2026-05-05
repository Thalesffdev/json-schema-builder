export type FieldType = 'string' | 'number' | 'boolean' | 'null'

export interface Field {
  id: string
  name: string
  value: string
  type: FieldType
  error?: string
}

export interface JsonBuilderState {
  fields: Field[]
  jsonOutput: string | null
  hasGenerated: boolean
}