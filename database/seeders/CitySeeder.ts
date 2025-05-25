import { BaseSeeder } from '@adonisjs/lucid/seeders'
import City from '#models/City'

export default class CitySeeder extends BaseSeeder {
  public async run() {
    await City.createMany([
      { title: 'Bogotá' },
      { title: 'Medellín' },
    ])
  }
}