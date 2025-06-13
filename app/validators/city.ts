import vine from '@vinejs/vine'

export const createCityValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
  })
)

export const updateCityValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
  })
)