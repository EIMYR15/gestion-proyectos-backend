import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/Role'
import City from '#models/City'
import TypeDocument from '#models/TypeDocument'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare typeDocumentId: number

  @column({ columnName: 'document' })
  declare document: number

  @column({ columnName: 'first_name' })
  declare firstName: string

  @column({ columnName: 'last_name' })
  declare lastName: string

  @column({ columnName: 'telephone' })
  declare telephone: number

  @column()
  declare cityId: number

  @column({ columnName: 'email' })
  declare email: string

  @column({ columnName: 'username' })
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column({
    columnName: 'permissions',
    serializeAs: 'permissions',
    prepare: (value: Record<string, boolean> | null) => JSON.stringify(value ?? {}),
    consume: (value: string | null) => (value ? JSON.parse(value) : null),
  })
  declare permissions: Record<string, boolean> | null

  @belongsTo(() => TypeDocument, {
    foreignKey: 'typeDocumentId',
  })
  declare typeDocument: BelongsTo<typeof TypeDocument>

  @belongsTo(() => City, {
    foreignKey: 'cityId',
  })
  declare city: BelongsTo<typeof City>

  @manyToMany(() => Role, {
    pivotTable: 'role_users',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare roles: ManyToMany<typeof Role>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  /**
   * Get all effective permissions for the user (roles merged, user has priority)
   */
  async getAllowedPermissions(this: User): Promise<Record<string, true>> {
    if (!this.$preloaded?.roles) {
      await this.load('roles')
    }
    const allowed: Record<string, true> = {}

    // Merge from roles
    for (const role of this.roles || []) {
      for (const [perm, value] of Object.entries(role.permissions || {})) {
        if (value) allowed[perm] = true
      }
    }

    // Merge from user and override
    for (const [perm, value] of Object.entries(this.permissions || {})) {
      if (value) allowed[perm] = true
      else if (perm in allowed && !value) delete allowed[perm]
    }

    return allowed
  }



  /**
   * Check if user has a specific permission
   */
  async hasPermission(permission: string): Promise<boolean> {
    const perms = await this.getAllowedPermissions()
    return !!perms[permission]
  }
}
