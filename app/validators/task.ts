import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim(),
    projectId: vine.number(),
    userId: vine.number(),
    priorityId: vine.number(),
    statusId: vine.number(),
    dueDate: vine.date(),
  })
)

export const updateTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    projectId: vine.number().optional(),
    userId: vine.number().optional(),
    priorityId: vine.number().optional(),
    statusId: vine.number().optional(),
    dueDate: vine.date().optional(),
  })
)