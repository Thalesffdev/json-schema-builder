import { useState, useCallback } from 'react'
import { Field, FieldType, JsonBuilderState } from '@/types/field'
import { buildJson } from '@/utils/buildJson'

const createEmptyField = (): Field => ({
  id: crypto.randomUUID(),
  name: '',
  value: '',
  type: 'string',
  error: undefined,
})

const initialState: JsonBuilderState = {
  fields: [createEmptyField()],
  jsonOutput: null,
  hasGenerated: false,
}

export function useFieldBuilder() {
  const [state, setState] = useState<JsonBuilderState>(initialState)

  const addField = useCallback(() => {
    setState(prev => ({
      ...prev,
      fields: [...prev.fields, createEmptyField()],
    }))
  }, [])

  const removeField = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== id),
    }))
  }, [])

  const updateField = useCallback(
    (id: string, key: keyof Omit<Field, 'id' | 'error'>, value: string) => {
      setState(prev => ({
        ...prev,
        fields: prev.fields.map(field =>
          field.id === id
            ? { ...field, [key]: value as FieldType, error: undefined }
            : field
        ),
      }))
    },
    []
  )

  const validateFields = useCallback((fields: Field[]): Field[] => {
    const seenNames = new Set<string>()

    return fields.map(field => {
      if (!field.name.trim()) {
        return { ...field, error: 'O nome do campo é obrigatório' }
      }

      if (/\s/.test(field.name)) {
        return { ...field, error: 'O nome não pode conter espaços' }
      }

      if (seenNames.has(field.name)) {
        return { ...field, error: 'Nome duplicado' }
      }

      seenNames.add(field.name)

      if (field.type === 'number' && isNaN(Number(field.value))) {
        return { ...field, error: 'Valor inválido para o tipo number' }
      }

      if (
        field.type === 'boolean' &&
        field.value !== 'true' &&
        field.value !== 'false'
      ) {
        return { ...field, error: 'Valor deve ser "true" ou "false"' }
      }

      return { ...field, error: undefined }
    })
  }, [])

  const generateJson = useCallback(() => {
    const validated = validateFields(state.fields)
    const hasErrors = validated.some(field => field.error !== undefined)

    if (hasErrors) {
      setState(prev => ({ ...prev, fields: validated }))
      return
    }

    const output = buildJson(validated)

    setState(prev => ({
      ...prev,
      fields: validated,
      jsonOutput: JSON.stringify(output, null, 2),
      hasGenerated: true,
    }))
  }, [state.fields, validateFields])

  const resetOutput = useCallback(() => {
    setState(prev => ({ ...prev, jsonOutput: null, hasGenerated: false }))
  }, [])

  return {
    fields: state.fields,
    jsonOutput: state.jsonOutput,
    hasGenerated: state.hasGenerated,
    addField,
    removeField,
    updateField,
    generateJson,
    resetOutput,
  }
}