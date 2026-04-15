import { Router } from 'express'
import * as subscriberController from './subscriber.controller.js'

export const subscriberRouter = Router()

subscriberRouter.get('/', subscriberController.getAllSubscribers)
subscriberRouter.get('/:id', subscriberController.getSubscriberById)
subscriberRouter.post('/', subscriberController.createSubscriber)
subscriberRouter.put('/:id', subscriberController.updateSubscriber)
subscriberRouter.delete('/:id', subscriberController.deleteSubscriber)
