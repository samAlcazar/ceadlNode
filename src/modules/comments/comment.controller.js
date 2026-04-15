import * as commentService from './comment.service.js'

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await commentService.getAllComments()
    res.json(comments)
  } catch (error) {
    next(error)
  }
}

export const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await commentService.getCommentById(id)
    res.json(comment)
  } catch (error) {
    next(error)
  }
}

export const createComment = async (req, res, next) => {
  try {
    const payload = req.body
    const newComment = await commentService.createComment(payload)
    res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
}

export const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const payload = req.body
    const updatedComment = await commentService.updateComment(id, payload)
    res.json(updatedComment)
  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params
    await commentService.deleteComment(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
