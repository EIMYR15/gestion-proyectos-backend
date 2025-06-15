import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TypeDocument from '#models/TypeDocument'

export default class TypeDocumentSeeder extends BaseSeeder {
    public async run() {
        await TypeDocument.createMany([
            { abbreviation: 'CC', title: 'Cédula de Ciudadanía' },
            { abbreviation: 'CE', title: 'Cédula de Extranjería' },
            { abbreviation: 'PA', title: 'Pasaporte' },
            { abbreviation: 'PEP', title: 'Permiso Especial de Permanencia' },
            { abbreviation: 'NIT', title: 'Número de Identificación Tributaria' },
            { abbreviation: 'NUIP', title: 'Número Único de Identificación Personal' },
            { abbreviation: 'DNI', title: 'Documento Nacional de Identidad' }
        ])
    }
}
