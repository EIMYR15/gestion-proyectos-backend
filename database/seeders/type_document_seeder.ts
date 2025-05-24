import TypeDocument from '#models/type_document'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await TypeDocument.createMany([
      { abbreviation: 'CC', title: 'Cédula de Ciudadanía' },
      { abbreviation: 'CE', title: 'Cédula de Extranjería' },
      { abbreviation: 'NIT', title: 'Número de Identificación Tributaria' },
      { abbreviation: 'PAS', title: 'Pasaporte' },
    ])
  }
}
