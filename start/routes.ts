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
const TasksController = () => import('#controllers/tasks_controller')
const StatusesController = () => import('#controllers/statuses_controller')
const CitiesController = () => import('#controllers/cities_controller')
const CommentsController = () => import('#controllers/comments_controller')
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

// Usuarios
router
  .group(() => {
    router.get('/', [UsersController, 'index']).use(middleware.auth_can(['user:read']))
    router.post('/', [UsersController, 'store']).use(middleware.auth_can(['user:create']))
    router.get('/:id', [UsersController, 'show']).use(middleware.auth_can(['user:read']))
    router.put('/:id', [UsersController, 'update']).use(middleware.auth_can(['user:update']))
    router.delete('/:id', [UsersController, 'destroy']).use(middleware.auth_can(['user:delete']))
  })
  .prefix('/api/users')

// Roles
router
  .group(() => {
    router.get('/', [RolesController, 'index']).use(middleware.auth_can(['role:read']))
    router.post('/', [RolesController, 'store']).use(middleware.auth_can(['role:create']))
    router.get('/:id', [RolesController, 'show']).use(middleware.auth_can(['role:read']))
    router.put('/:id', [RolesController, 'update']).use(middleware.auth_can(['role:update']))
    router.delete('/:id', [RolesController, 'destroy']).use(middleware.auth_can(['role:delete']))
  })
  .prefix('/api/roles')

// Proyectos
router
  .group(() => {
    router.get('/', [ProjectsController, 'index']).use(middleware.auth_can(['project:read']))
    router.post('/', [ProjectsController, 'store']).use(middleware.auth_can(['project:create']))
    router.get('/:id', [ProjectsController, 'show']).use(middleware.auth_can(['project:read']))
    router.put('/:id', [ProjectsController, 'update']).use(middleware.auth_can(['project:update']))
    router.delete('/:id', [ProjectsController, 'destroy']).use(middleware.auth_can(['project:delete']))
  })
  .prefix('/api/projects')

// Tareas
router
  .group(() => {
    router.get('/', [TasksController, 'index']).use(middleware.auth_can(['task:read']))
    router.post('/', [TasksController, 'store']).use(middleware.auth_can(['task:create']))
    router.get('/:id', [TasksController, 'show']).use(middleware.auth_can(['task:read']))
    router.put('/:id', [TasksController, 'update']).use(middleware.auth_can(['task:update']))
    router.delete('/:id', [TasksController, 'destroy']).use(middleware.auth_can(['task:delete']))
  })
  .prefix('/api/tasks')

// Rutas de estados
router
  .group(() => {
    router.get('/', [StatusesController, 'index']).use(middleware.auth_can(['status:read']))
    router.post('/', [StatusesController, 'store']).use(middleware.auth_can(['status:create']))
    router.get('/:id', [StatusesController, 'show']).use(middleware.auth_can(['status:read']))
    router.put('/:id', [StatusesController, 'update']).use(middleware.auth_can(['status:update']))
    router.delete('/:id', [StatusesController, 'destroy']).use(middleware.auth_can(['status:delete']))
  })
  .prefix('/api/statuses')

//Rutas de ciudades
router
  .group(() => {
    router.get('/', [CitiesController, 'index']).use(middleware.auth_can(['city:read']))
    router.post('/', [CitiesController, 'store']).use(middleware.auth_can(['city:create']))
    router.get('/:id', [CitiesController, 'show']).use(middleware.auth_can(['city:read']))
    router.put('/:id', [CitiesController, 'update']).use(middleware.auth_can(['city:update']))
    router.delete('/:id', [CitiesController, 'destroy']).use(middleware.auth_can(['city:delete']))
  })
  .prefix('/api/cities')
// Rutas de comentarios
router
  .group(() => {
    router.get('/', [CommentsController, 'index']).use(middleware.auth_can(['comment:read']))
    router.post('/', [CommentsController, 'store']).use(middleware.auth_can(['comment:create']))
    router.get('/:id', [CommentsController, 'show']).use(middleware.auth_can(['comment:read']))
    router.put('/:id', [CommentsController, 'update']).use(middleware.auth_can(['comment:update']))
    router.delete('/:id', [CommentsController, 'destroy']).use(middleware.auth_can(['comment:delete']))
  })
  .prefix('/api/comments')
// Rutas de prioridades
router
  .group(() => {
    router.get('/', [PrioritiesController, 'index']).use(middleware.auth_can(['priority:read']))
    router.post('/', [PrioritiesController, 'store']).use(middleware.auth_can(['priority:create']))
    router.get('/:id', [PrioritiesController, 'show']).use(middleware.auth_can(['priority:read']))
    router.put('/:id', [PrioritiesController, 'update']).use(middleware.auth_can(['priority:update']))
    router.delete('/:id', [PrioritiesController, 'destroy']).use(middleware.auth_can(['priority:delete']))
  })
  .prefix('/api/priorities')
// Rutas de tipos de documentos
router
  .group(() => {
    router.get('/', [TypesDocumentsController, 'index']).use(middleware.auth_can(['type_document:read']))
    router.post('/', [TypesDocumentsController, 'store']).use(middleware.auth_can(['type_document:create']))
    router.get('/:id', [TypesDocumentsController, 'show']).use(middleware.auth_can(['type_document:read']))
    router.put('/:id', [TypesDocumentsController, 'update']).use(middleware.auth_can(['type_document:update']))
    router.delete('/:id', [TypesDocumentsController, 'destroy']).use(middleware.auth_can(['type_document:delete']))
  })
  .prefix('/api/types_documents')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.get('/me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/api/auth')

