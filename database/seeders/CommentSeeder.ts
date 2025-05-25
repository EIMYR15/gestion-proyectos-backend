import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Comment from '#models/Comment'

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    await Comment.createMany([
      {
        userId: 1,
        taskId: 1,
        description: 'This is a comment for Task 1',
      },
      {
        userId: 2,
        taskId: 2,
        description: 'This is a comment for Task 2',
      },
    ])
  }
}