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
}
