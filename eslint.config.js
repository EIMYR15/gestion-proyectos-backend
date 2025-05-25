import { configApp } from '@adonisjs/eslint-config'
export default [
  configApp(),
  {
    rules: {
      'unicorn/file-name': [
        'error',
        {
          cases: {
            camelCase: true,
            snakeCase: true,
            pascalCase: true,
            }},
      ],
    },
  },
]
