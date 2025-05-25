import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TypeDocument from '#models/TypeDocument'

export default class TypeDocumentSeeder extends BaseSeeder {
    public async run() {
        await TypeDocument.createMany([
            { abbreviation: 'CC', title: 'Cédula de Ciudadanía' },
            { abbreviation: 'TI', title: 'Tarjeta de Identidad' },
        ])
    }
}