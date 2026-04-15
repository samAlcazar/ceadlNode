import { Router } from 'express'
import * as postController from './post.controller.js'
import { requireAuth } from '../../middlewares/auth.middleware.js'

export const postRouter = Router()

postRouter.get('/', postController.getAllPosts)
postRouter.get('/:id', postController.getPostById)
postRouter.post('/', requireAuth, postController.createPost)
postRouter.put('/:id', requireAuth, postController.updatePost)
postRouter.delete('/:id', requireAuth, postController.deletePost)
