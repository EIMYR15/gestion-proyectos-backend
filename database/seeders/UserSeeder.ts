import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        typeDocumentId: 1,
        document: 1234567890,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        password: 'password123',
        telephone: 3001234567,
        cityId: 1,
      },
      {
        typeDocumentId: 2,
        document: 9876543210,
        firstName: 'Ana',
        lastName: 'Gómez',
        email: 'ana.gomez@example.com',
        password: 'password456',
        telephone: 3007654321,
        cityId: 2,
      },
    ])
  }
}