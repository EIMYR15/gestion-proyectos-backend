import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Project from '#models/Project'

export default class ProjectSeeder extends BaseSeeder {
    public async run() {
        await Project.createMany([
  {
  title: 'Proyecto A',
  description: 'Descripción del Proyecto A',
  userId: 1,
  statusId: 5, // changed
  clientId: 2,
  startDate: new Date('2025-05-01'),
  endDate: new Date('2025-12-31'),
},
{
  title: 'Proyecto B',
  description: 'Descripción del Proyecto B',
  userId: 2,
  statusId: 6, // changed
  clientId: 1,
  startDate: new Date('2025-06-01'),
  endDate: new Date('2025-11-30'),
},
{
  title: 'Proyecto Beta',
  description: 'Proyecto beta para nuevo cliente',
  userId: 2,
  statusId: 7, // changed
  clientId: 3,
  startDate: new Date('2025-02-01'),
  endDate: new Date('2025-07-15'),
},
{
  title: 'Proyecto Gamma',
  description: 'Proyecto Gamma con funcionalidades avanzadas',
  userId: 3,
  statusId: 8, // changed
  clientId: 4,
  startDate: new Date('2025-03-05'),
  endDate: new Date('2025-08-20'),
},
{
  title: 'Proyecto Delta',
  description: 'Proyecto Delta para uso interno',
  userId: 4,
  statusId: 9, // changed
  clientId: 5,
  startDate: new Date('2025-04-10'),
  endDate: new Date('2025-09-25'),
},
{
  title: 'Proyecto Épsilon',
  description: 'Proyecto Épsilon para pruebas',
  userId: 5,
  statusId: 5, // changed
  clientId: 6,
  startDate: new Date('2025-05-15'),
  endDate: new Date('2025-10-30'),
},
{
  title: 'Proyecto Zeta',
  description: 'Proyecto Zeta para automatización',
  userId: 6,
  statusId: 6, // changed
  clientId: 7,
  startDate: new Date('2025-06-20'),
  endDate: new Date('2025-11-15'),
},
{
  title: 'Proyecto Eta',
  description: 'Proyecto Eta para desarrollo móvil',
  userId: 7,
  statusId: 7, // changed
  clientId: 8,
  startDate: new Date('2025-07-25'),
  endDate: new Date('2025-12-20'),
},
{
  title: 'Proyecto Theta',
  description: 'Proyecto Theta para plataforma web',
  userId: 8,
  statusId: 8, // changed
  clientId: 9,
  startDate: new Date('2025-08-30'),
  endDate: new Date('2026-01-25'),
},
{
  title: 'Proyecto Iota',
  description: 'Proyecto Iota para análisis de datos',
  userId: 9,
  statusId: 9, // changed
  clientId: 10,
  startDate: new Date('2025-09-05'),
  endDate: new Date('2026-02-28'),
},
{
  title: 'Proyecto Kappa',
  description: 'Proyecto Kappa para integración',
  userId: 10,
  statusId: 5, // changed
  clientId: 11,
  startDate: new Date('2025-10-10'),
  endDate: new Date('2026-03-15'),
},
{
  title: 'Proyecto Lambda',
  description: 'Proyecto Lambda para migración',
  userId: 11,
  statusId: 6, // changed
  clientId: 12,
  startDate: new Date('2025-11-15'),
  endDate: new Date('2026-04-20'),
},
{
  title: 'Proyecto Mu',
  description: 'Proyecto Mu para servicios en la nube',
  userId: 12,
  statusId: 7, // changed
  clientId: 13,
  startDate: new Date('2025-12-20'),
  endDate: new Date('2026-05-25'),
},
{
  title: 'Proyecto Nu',
  description: 'Proyecto Nu para seguridad',
  userId: 13,
  statusId: 8, // changed
  clientId: 14,
  startDate: new Date('2026-01-25'),
  endDate: new Date('2026-06-30'),
},
{
  title: 'Proyecto Xi',
  description: 'Proyecto Xi para rendimiento',
  userId: 14,
  statusId: 9, // changed
  clientId: 15,
  startDate: new Date('2026-02-28'),
  endDate: new Date('2026-07-15'),
},
{
  title: 'Proyecto Ómicron',
  description: 'Proyecto Ómicron para escalabilidad',
  userId: 15,
  statusId: 5, // changed
  clientId: 16,
  startDate: new Date('2026-03-05'),
  endDate: new Date('2026-08-20'),
},
{
  title: 'Proyecto Pi',
  description: 'Proyecto Pi para integración de IA',
  userId: 16,
  statusId: 6, // changed
  clientId: 17,
  startDate: new Date('2026-04-10'),
  endDate: new Date('2026-09-25'),
},
{
  title: 'Proyecto Rho',
  description: 'Proyecto Rho para IoT',
  userId: 17,
  statusId: 7, // changed
  clientId: 18,
  startDate: new Date('2026-05-15'),
  endDate: new Date('2026-10-30'),
},
{
  title: 'Proyecto Sigma',
  description: 'Proyecto Sigma para DevOps',
  userId: 18,
  statusId: 8, // changed
  clientId: 19,
  startDate: new Date('2026-06-20'),
  endDate: new Date('2026-11-15'),
},
{
  title: 'Proyecto Tau',
  description: 'Proyecto Tau para automatización',
  userId: 19,
  statusId: 9, // changed
  clientId: 20,
  startDate: new Date('2026-07-25'),
  endDate: new Date('2026-12-20'),
},
{
  title: 'Proyecto Ípsilon',
  description: 'Proyecto Ípsilon para reportes',
  userId: 20,
  statusId: 5, // changed
  clientId: 21,
  startDate: new Date('2026-08-30'),
  endDate: new Date('2027-01-25'),
},
{
  title: 'Proyecto Fi',
  description: 'Proyecto Fi para paneles de control',
  userId: 21,
  statusId: 6, // changed
  clientId: 22,
  startDate: new Date('2026-09-05'),
  endDate: new Date('2027-02-28'),
},
{
  title: 'Proyecto Ji',
  description: 'Proyecto Ji para notificaciones',
  userId: 22,
  statusId: 7, // changed
  clientId: 23,
  startDate: new Date('2026-10-10'),
  endDate: new Date('2027-03-15'),
},
{
  title: 'Proyecto Psi',
  description: 'Proyecto Psi para gestión de usuarios',
  userId: 23,
  statusId: 8, // changed
  clientId: 24,
  startDate: new Date('2026-11-15'),
  endDate: new Date('2027-04-20'),
},
{
  title: 'Proyecto Omega',
  description: 'Proyecto Omega para entrega final',
  userId: 24,
  statusId: 9, // changed
  clientId: 25,
  startDate: new Date('2026-12-20'),
  endDate: new Date('2027-05-25'),
},
{
  title: 'Proyecto Nova',
  description: 'Proyecto Nova para innovación',
  userId: 25,
  statusId: 5, // changed
  clientId: 1,
  startDate: new Date('2027-01-25'),
  endDate: new Date('2027-06-30'),
},

  ])
 }
}
