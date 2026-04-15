import * as subscriberService from './subscriber.service.js'

export const getAllSubscribers = async (req, res, next) => {
  try {
    const subscribers = await subscriberService.getAllSubscribers()
    res.json(subscribers)
  } catch (error) {
    next(error)
  }
}

export const getSubscriberById = async (req, res, next) => {
  try {
    const { id } = req.params
    const subscriber = await subscriberService.getSubscriberById(id)
    res.json(subscriber)
  } catch (error) {
    next(error)
  }
}

export const createSubscriber = async (req, res, next) => {
  try {
    const payload = req.body
    const newSubscriber = await subscriberService.createSubscriber(payload)
    res.status(201).json(newSubscriber)
  } catch (error) {
    next(error)
  }
}

export const updateSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params
    const payload = req.body
    const updatedSubscriber = await subscriberService.updateSubscriber(id, payload)
    res.json(updatedSubscriber)
  } catch (error) {
    next(error)
  }
}

export const deleteSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params
    await subscriberService.deleteSubscriber(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
