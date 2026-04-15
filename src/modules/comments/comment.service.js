import * as commentModel from './comment.model.js'
import { validateComment, validateCommentUpdate } from './comment.validator.js'

export const getAllComments = async () => {
  try {
    return await commentModel.getAllComments()
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw new Error('Could not fetch comments')
  }
}

export const getCommentById = async (id) => {
  try {
    return await commentModel.getCommentById(id)
  } catch (error) {
    console.error(`Error fetching comment with id ${id}:`, error)
    throw new Error('Could not fetch comment')
  }
}

export const createComment = async (payload) => {
  try {
    const validatedPayload = validateComment(payload)
    return await commentModel.createComment(validatedPayload)
  } catch (error) {
    console.error('Error creating comment:', error)
    throw new Error('Could not create comment')
  }
}

export const updateComment = async (id, payload) => {
  try {
    const validatedPayload = validateCommentUpdate(payload)
    return await commentModel.updateComment(id, validatedPayload)
  } catch (error) {
    console.error(`Error updating comment with id ${id}:`, error)
    throw new Error('Could not update comment')
  }
}

export const deleteComment = async (id) => {
  try {
    return await commentModel.deleteComment(id)
  } catch (error) {
    console.error(`Error deleting comment with id ${id}:`, error)
    throw new Error('Could not delete comment')
  }
}
