import vine from '@vinejs/vine'

export const createCommentValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    taskId: vine.number(),
    description: vine.string().trim(),
  })
)

export const updateCommentValidator = vine.compile(
  vine.object({
    description: vine.string().trim().optional(),
  })
)