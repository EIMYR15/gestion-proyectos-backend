import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TypeDocument from '#models/TypeDocument'

export default class TypeDocumentSeeder extends BaseSeeder {
    public async run() {
        await TypeDocument.createMany([
            { abbreviation: 'CC', title: 'Cédula de Ciudadanía' },
            { abbreviation: 'CE', title: 'Cedula de Extranjeria' },
            { abbreviation: 'PA', title: 'Pasaporte' },
            { abbreviation: 'RC', title: 'Registro Civil' },
            { abbreviation: 'PEP', title: 'Permiso Especial de Permanencia' },
            { abbreviation: 'NIT', title: 'Número de Identificación Tributaria' },
            { abbreviation: 'RUT', title: 'Registro Único Tributario' },
            { abbreviation: 'OTRO', title: 'Otro' }
        ])
    }
}
