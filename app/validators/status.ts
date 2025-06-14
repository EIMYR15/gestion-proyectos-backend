import vine from '@vinejs/vine'

export const createStatusValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim(),
    type: vine.enum(['task', 'project']),
  })
)

export const updateStatusValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    type: vine.enum(['task', 'project']).optional(),
  })
)