import express from 'express'
import { userRouter } from './modules/users/user.routes.js'
import { postRouter } from './modules/posts/post.routes.js'
import { commentRouter } from './modules/comments/comment.routes.js'
import { subscriberRouter } from './modules/subscribers/subscriber.routes.js'

const app = express()

app.use(express.json())
app.disable('x-powered-by')

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/subscribers', subscriberRouter)

app.get('/', async (req, res) => {
  res.json('Hello World!')
})

export default app
