import { pool } from '../../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export const getAllUsers = async () => {
  const { rows } = await pool.query('SELECT id_user, nick_name, name FROM users')
  return rows
}

export const getUserById = async (id) => {
  const { rows } = await pool.query('SELECT id_user, nick_name, name FROM users WHERE id_user = $1', [id])
  return rows[0]
}

export const createUser = async (payload) => {
  const { nickName, name, passwordHash } = payload
  const idUser = uuidv4()
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (id_user, nick_name, name, password_hash) VALUES ($1, $2, $3, $4) RETURNING id_user, nick_name, name',
      [idUser, nickName, name, passwordHash]
    )
    return rows[0]
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Could not create user')
  }
}

export const updateUser = async (id, payload) => {
  const { nickName, name, passwordHash } = payload
  try {
    const { rows } = await pool.query(
      'UPDATE users SET nick_name = $1, name = $2, password_hash = $3 WHERE id_user = $4 RETURNING id_user, nick_name, name',
      [nickName, name, passwordHash, id]
    )
    return rows[0]
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error)
    throw new Error('Could not update user')
  }
}

export const deleteUser = async (id) => {
  try {
    await pool.query('DELETE FROM users WHERE id_user = $1', [id])
    return { message: 'User deleted successfully' }
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error)
    throw new Error('Could not delete user')
  }
}

export const getUserByNickName = async (nickName) => {
  try {
    const { rows } = await pool.query(
      `SELECT id_user, nick_name, name, password_hash 
       FROM users 
       WHERE nick_name = $1`,
      [nickName]
    )
    return rows[0]
  } catch (error) {
    console.error(`Error fetching user with nickName ${nickName}:`, error)
    throw new Error('Could not fetch user')
  }
}
