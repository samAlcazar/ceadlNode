import * as postModel from './post.model.js'
import { validatePost, validatePostUpdate } from './post.validator.js'

export const getAllPosts = async () => {
  try {
    return await postModel.getAllPosts()
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Could not fetch posts')
  }
}

export const getPostById = async (id) => {
  try {
    return await postModel.getPostById(id)
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error)
    throw new Error('Could not fetch post')
  }
}

export const createPost = async (payload) => {
  try {
    const validatedPayload = validatePost(payload)
    return await postModel.createPost(validatedPayload)
  } catch (error) {
    console.error('Error creating post:', error)
    throw new Error('Could not create post')
  }
}

export const updatePost = async (id, payload) => {
  try {
    const validatedPayload = validatePostUpdate(payload)
    return await postModel.updatePost(id, validatedPayload)
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error)
    throw new Error('Could not update post')
  }
}

export const deletePost = async (id) => {
  try {
    return await postModel.deletePost(id)
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error)
    throw new Error('Could not delete post')
  }
}
