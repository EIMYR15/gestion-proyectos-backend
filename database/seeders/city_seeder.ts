import City from '#models/city'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await City.createMany([
      { title: 'Amazonas' },
      { title: 'Antioquia' },
      { title: 'Arauca' },
      { title: 'Atlántico' },
      { title: 'Bolívar' },
      { title: 'Boyacá' },
      { title: 'Caldas' },
      { title: 'Caquetá' },
      { title: 'Casanare' },
      { title: 'Cauca' },
      { title: 'Cesar' },
      { title: 'Chocó' },
      { title: 'Córdoba' },
      { title: 'Cundinamarca' },
      { title: 'Guainía' },
      { title: 'Guaviare' },
      { title: 'Huila' },
      { title: 'La Guajira' },
      { title: 'Magdalena' },
      { title: 'Meta' },
      { title: 'Nariño' },
      { title: 'Norte de Santander' },
      { title: 'Putumayo' },
      { title: 'Quindío' },
      { title: 'Risaralda' },
      { title: 'San Andrés y Providencia' },
      { title: 'Santander' },
      { title: 'Sucre' },
      { title: 'Tolima' },
      { title: 'Valle del Cauca' },
      { title: 'Vaupés' },
      { title: 'Vichada' },
    ])
  }
}
