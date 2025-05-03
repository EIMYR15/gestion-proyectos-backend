/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

//Users Route
router.group(() => {
  router.get('/', [UsersController, 'index'])
  router.post('/', [UsersController, 'store'])
  router.get('/:id', [UsersController, 'show'])
  router.put('/:id', [UsersController, 'update'])
  router.delete('/:id', [UsersController, 'destroy'])
}).prefix('/api/users')
