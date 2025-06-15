import { BaseSeeder } from '@adonisjs/lucid/seeders'
import City from '#models/City'

export default class CitySeeder extends BaseSeeder {
  public async run() {
    await City.createMany([
      { title: 'Bogotá' },
      { title: 'Medellín' },
      { title: 'Cali' },
      { title: 'Barranquilla' },
      { title: 'Cartagena' },
      { title: 'Cúcuta' },
      { title: 'Bucaramanga' },
      { title: 'Pereira' },
      { title: 'Santa Marta' },
      { title: 'Ibagué' },
      { title: 'Villavicencio' },
      { title: 'Manizales' },
      { title: 'Pasto' },
      { title: 'Montería' },
      { title: 'Neiva' },
      { title: 'Popayán' },
      { title: 'Armenia' },
      { title: 'Sincelejo' },
      { title: 'Valledupar' },
      { title: 'Tunja' },
      { title: 'Riohacha' },
      { title: 'Quibdó' },
      { title: 'Florencia' },
      { title: 'Yopal' },
      { title: 'San José del Guaviare' },
      { title: 'Mocoa' },
      { title: 'Leticia' },
      { title: 'Mitú' },
      { title: 'Puerto Carreño' }
    ])
  }
}
