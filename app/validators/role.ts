import vine from '@vinejs/vine'

export const createRoleValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim(),
    permissions: vine.string().trim(),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    permissions: vine.string().trim().optional(),
  })
)