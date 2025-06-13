import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim(),
    userId: vine.number(),
    statusId: vine.number(),
    clientId: vine.number(),
    startDate: vine.date(),
    endDate: vine.date(),
  })
)

export const updateProjectValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    userId: vine.number().optional(),
    statusId: vine.number().optional(),
    clientId: vine.number().optional(),
    startDate: vine.date().optional(),
    endDate: vine.date().optional(),
  })
)