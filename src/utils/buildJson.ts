import { Field, FieldType } from '@/types/field'

type PrimitiveValue = string | number | boolean | null

const coerceValue = (value: string, type: FieldType): PrimitiveValue => {
  switch (type) {
    case 'string':
      return value

    case 'number':
      return Number(value)

    case 'boolean':
      return value === 'true'

    case 'null':
      return null
  }
}

export const buildJson = (fields: Field[]): Record<string, PrimitiveValue> => {
  return fields.reduce<Record<string, PrimitiveValue>>((acc, field) => {
    acc[field.name] = coerceValue(field.value, field.type)
    return acc
  }, {})
}