/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const RolesController = () => import('#controllers/roles_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const StatusesController = () => import('#controllers/statuses_controller')
const CitiesController = () => import('#controllers/cities_controller')
const CommentsController = () => import('#controllers/comments_controller')
const TasksController = () => import('#controllers/tasks_controller')
const PrioritiesController = () => import('#controllers/priorities_controller')
const TypesDocumentsController = () => import('#controllers/type_documents_controller')
const AuthController = () => import('#controllers/auth_controller')
const AppController = () => import('#controllers/app_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

//Users Route (rutas de usuarios)
router
  .group(() => {
    router.get('/permissions', [AppController, 'getPermissions'])
  })
  .prefix('/api/app')

//Users Route (rutas de usuarios)
router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.post('/', [UsersController, 'store'])
    router.get('/:id', [UsersController, 'show'])
    router.put('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'destroy'])
  })
  .prefix('/api/users')

// Rutas de Roles
router
  .group(() => {
    router.get('/', [RolesController, 'index']).use(middleware.auth_can(['role:read']))
    router.post('/', [RolesController, 'store'])
    router.get('/:id', [RolesController, 'show'])
    router.put('/:id', [RolesController, 'update'])
    router.delete('/:id', [RolesController, 'destroy'])
  })
  .prefix('/api/roles')

// Rutas de Proyectos
router
  .group(() => {
    router.get('/', [ProjectsController, 'index'])
    router.post('/', [ProjectsController, 'store'])
    router.get('/:id', [ProjectsController, 'show'])
    router.put('/:id', [ProjectsController, 'update'])
    router.delete('/:id', [ProjectsController, 'destroy'])
  })
  .prefix('/api/projects')

// Rutas de estados
router
  .group(() => {
    router.get('/', [StatusesController, 'index'])
    router.post('/', [StatusesController, 'store'])
    router.get('/:id', [StatusesController, 'show'])
    router.put('/:id', [StatusesController, 'update'])
    router.delete('/:id', [StatusesController, 'destroy'])
  })
  .prefix('/api/statuses')

//Rutas de ciudades
router
  .group(() => {
    router.get('/:id', [CitiesController, 'show'])
    router.put('/:id', [CitiesController, 'update'])
    router.get('/', [CitiesController, 'index'])
    router.delete('/:id', [CitiesController, 'destroy'])
    router.post('/', [CitiesController, 'store'])
  })
  .prefix('/api/cities')
// Rutas de comentarios
router
  .group(() => {
    router.get('/', [CommentsController, 'index'])
    router.post('/', [CommentsController, 'store'])
    router.get('/:id', [CommentsController, 'show'])
    router.put('/:id', [CommentsController, 'update'])
    router.delete('/:id', [CommentsController, 'destroy'])
  })
  .prefix('/api/comments')
// Rutas de tareas
router
  .group(() => {
    router.get('/', [TasksController, 'index'])
    router.post('/', [TasksController, 'store'])
    router.get('/:id', [TasksController, 'show'])
    router.put('/:id', [TasksController, 'update'])
    router.delete('/:id', [TasksController, 'destroy'])
  })
  .prefix('/api/tasks')
// Rutas de prioridades
router
  .group(() => {
    router.get('/', [PrioritiesController, 'index'])
    router.post('/', [PrioritiesController, 'store'])
    router.get('/:id', [PrioritiesController, 'show'])
    router.put('/:id', [PrioritiesController, 'update'])
    router.delete('/:id', [PrioritiesController, 'destroy'])
  })
  .prefix('/api/priorities')
// Rutas de tipos de documentos
router
  .group(() => {
    router.get('/', [TypesDocumentsController, 'index'])
    router.post('/', [TypesDocumentsController, 'store'])
    router.get('/:id', [TypesDocumentsController, 'show'])
    router.put('/:id', [TypesDocumentsController, 'update'])
    router.delete('/:id', [TypesDocumentsController, 'destroy'])
  })
  .prefix('/api/types_documents')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.get('/me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/api/auth')
