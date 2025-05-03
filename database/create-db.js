
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import { fileURLToPath } from 'url'
import path from 'path'

// Load .env manually
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../', '.env') })

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env

async function createDb() {
  if (!DB_USER || !DB_PASSWORD) {
    throw new Error('Database credentials not properly configured in .env file')
  }

  const config = {
    host: DB_HOST || 'localhost',
    port: DB_PORT ? parseInt(DB_PORT) : 3306,
    user: DB_USER,
    password: DB_PASSWORD,
  }

  let connection
  try {
    connection = await mysql.createConnection(config)
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`)
    console.log(`✅ Database '${DB_DATABASE}' is ready.`)
  } catch (err) {
    console.error('❌ Database Error:', {
      message: err.message,
      code: err.code,
      config: { ...config, password: '****' }
    })
    throw err
  } finally {
    if (connection) await connection.end()
  }
}

createDb().catch(err => {
  console.error('Failed to create database:', err.message)
  process.exit(1)
})
