import { Pool } from 'pg'

const DBconnect = {
  user: process.env.DB_USER || 'ceadl',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ceadl',
  password: process.env.DB_PASSWORD || 'mi4v-aee3-5939',
  port: process.env.DB_PORT || 5432
}

export const pool = new Pool(DBconnect)
