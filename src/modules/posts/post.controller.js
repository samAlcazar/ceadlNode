import * as postService from './post.service.js'

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts()
    res.json(posts)
  } catch (error) {
    next(error)
  }
}

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await postService.getPostById(id)
    res.json(post)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const payload = req.body
    const newPost = await postService.createPost(payload)
    res.status(201).json(newPost)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const payload = req.body
    const updatedPost = await postService.updatePost(id, payload)
    res.json(updatedPost)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params
    await postService.deletePost(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
