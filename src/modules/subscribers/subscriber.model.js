import { pool } from '../../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export const getAllSubscribers = async () => {
  const { rows } = await pool.query(
    'SELECT id_subscriber, email, name, created_at FROM subscribers ORDER BY created_at DESC'
  )
  return rows
}

export const getSubscriberById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id_subscriber, email, name, created_at FROM subscribers WHERE id_subscriber = $1',
    [id]
  )
  return rows[0]
}

export const createSubscriber = async (payload) => {
  const { email, name } = payload
  const idSubscriber = uuidv4()

  try {
    const { rows } = await pool.query(
      'INSERT INTO subscribers (id_subscriber, email, name) VALUES ($1, $2, $3) RETURNING id_subscriber, email, name, created_at',
      [idSubscriber, email, name ?? null]
    )
    return rows[0]
  } catch (error) {
    console.error('Error creating subscriber:', error)
    throw new Error('Could not create subscriber')
  }
}

export const deleteSubscriber = async (id) => {
  try {
    await pool.query('DELETE FROM subscribers WHERE id_subscriber = $1', [id])
    return { message: 'Subscriber deleted successfully' }
  } catch (error) {
    console.error(`Error deleting subscriber with id ${id}:`, error)
    throw new Error('Could not delete subscriber')
  }
}
