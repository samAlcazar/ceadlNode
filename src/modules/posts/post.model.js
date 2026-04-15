import { pool } from '../../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export const getAllPosts = async () => {
  const { rows } = await pool.query(
    'SELECT id_post, title, excerpt, content, tags, image, id_user, created_at, updated_at FROM posts ORDER BY created_at DESC'
  )
  return rows
}

export const getPostById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id_post, title, excerpt, content, tags, image, id_user, created_at, updated_at FROM posts WHERE id_post = $1',
    [id]
  )
  return rows[0]
}

export const createPost = async (payload) => {
  const { title, excerpt, content, tags, image, idUser } = payload
  const idPost = uuidv4()

  try {
    const { rows } = await pool.query(
      'INSERT INTO posts (id_post, title, excerpt, content, tags, image, id_user) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_post, title, excerpt, content, tags, image, id_user, created_at, updated_at',
      [idPost, title, excerpt, content, tags ?? null, image ?? null, idUser]
    )
    return rows[0]
  } catch (error) {
    console.error('Error creating post:', error)
    throw new Error('Could not create post')
  }
}

export const updatePost = async (id, payload) => {
  const { title, excerpt, content, tags, image, idUser } = payload

  try {
    const { rows } = await pool.query(
      `UPDATE posts
       SET title = COALESCE($1, title),
           excerpt = COALESCE($2, excerpt),
           content = COALESCE($3, content),
           tags = COALESCE($4, tags),
           image = COALESCE($5, image),
           id_user = COALESCE($6, id_user),
           updated_at = CURRENT_TIMESTAMP
       WHERE id_post = $7
       RETURNING id_post, title, excerpt, content, tags, image, id_user, created_at, updated_at`,
      [title, excerpt, content, tags, image, idUser, id]
    )
    return rows[0]
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error)
    throw new Error('Could not update post')
  }
}

export const deletePost = async (id) => {
  try {
    await pool.query('DELETE FROM posts WHERE id_post = $1', [id])
    return { message: 'Post deleted successfully' }
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error)
    throw new Error('Could not delete post')
  }
}
