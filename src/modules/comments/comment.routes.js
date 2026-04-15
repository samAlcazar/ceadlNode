import { Router } from 'express'
import * as commentController from './comment.controller.js'

export const commentRouter = Router()

commentRouter.get('/', commentController.getAllComments)
commentRouter.get('/:id', commentController.getCommentById)
commentRouter.post('/', commentController.createComment)
commentRouter.put('/:id', commentController.updateComment)
commentRouter.delete('/:id', commentController.deleteComment)
