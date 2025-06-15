import vine from '@vinejs/vine'
import { permissionsSchema } from '../../config/permissions.js'

export const createRoleValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim(),
    permissions: permissionsSchema.optional(),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    permissions: permissionsSchema.optional(),
  })
)
