import vine from '@vinejs/vine'

export const createTypeDocumentValidator = vine.compile(
  vine.object({
    abbreviation: vine.string().trim(),
    title: vine.string().trim(),
  })
)

export const updateTypeDocumentValidator = vine.compile(
  vine.object({
    abbreviation: vine.string().trim().optional(),
    title: vine.string().trim().optional(),
  })
)