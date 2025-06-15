import vine from '@vinejs/vine'
import { permissionsSchema } from '../../config/permissions.js'

export const createUserValidator = vine.compile(
  vine.object({
    typeDocumentId: vine.number(),
    document: vine.number(),
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
    telephone: vine.number(),
    cityId: vine.number(),
    email: vine.string().trim().email(),
    password: vine.string().minLength(8),
    roles: vine.array(vine.number()).optional(),
    permissions: permissionsSchema.optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    typeDocumentId: vine.number().optional(),
    document: vine.number().optional(),
    firstName: vine.string().trim().optional(),
    lastName: vine.string().trim().optional(),
    telephone: vine.number().optional(),
    cityId: vine.number().optional(),
    email: vine.string().trim().email().optional(),
    password: vine.string().minLength(8).optional(),
    roles: vine.array(vine.number()).optional(),
    permissions: permissionsSchema.optional(),
  })
)
