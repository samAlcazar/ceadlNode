import { pool } from '../../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export const getAllComments = async () => {
  const { rows } = await pool.query(
    'SELECT id_comment, name, email, content, id_post, is_approved, created_at FROM comments ORDER BY created_at DESC'
  )
  return rows
}

export const getCommentById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id_comment, name, email, content, id_post, is_approved, created_at FROM comments WHERE id_comment = $1',
    [id]
  )
  return rows[0]
}

export const createComment = async (payload) => {
  const { name, email, content, idPost, isApproved } = payload
  const idComment = uuidv4()

  try {
    const { rows } = await pool.query(
      'INSERT INTO comments (id_comment, name, email, content, id_post, is_approved) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_comment, name, email, content, id_post, is_approved, created_at',
      [idComment, name, email, content, idPost, isApproved ?? false]
    )
    return rows[0]
  } catch (error) {
    console.error('Error creating comment:', error)
    throw new Error('Could not create comment')
  }
}

export const updateComment = async (id, payload) => {
  const { name, email, content, idPost, isApproved } = payload

  try {
    const { rows } = await pool.query(
      `UPDATE comments
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           content = COALESCE($3, content),
           id_post = COALESCE($4, id_post),
           is_approved = COALESCE($5, is_approved)
       WHERE id_comment = $6
       RETURNING id_comment, name, email, content, id_post, is_approved, created_at`,
      [name, email, content, idPost, isApproved, id]
    )
    return rows[0]
  } catch (error) {
    console.error(`Error updating comment with id ${id}:`, error)
    throw new Error('Could not update comment')
  }
}

export const deleteComment = async (id) => {
  try {
    await pool.query('DELETE FROM comments WHERE id_comment = $1', [id])
    return { message: 'Comment deleted successfully' }
  } catch (error) {
    console.error(`Error deleting comment with id ${id}:`, error)
    throw new Error('Could not delete comment')
  }
}
