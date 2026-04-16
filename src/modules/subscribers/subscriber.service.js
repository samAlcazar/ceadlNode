import * as subscriberModel from './subscriber.model.js'
import { validateSubscriber } from './subscriber.validator.js'

export const getAllSubscribers = async () => {
  try {
    return await subscriberModel.getAllSubscribers()
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    throw new Error('Could not fetch subscribers')
  }
}

export const getSubscriberById = async (id) => {
  try {
    return await subscriberModel.getSubscriberById(id)
  } catch (error) {
    console.error(`Error fetching subscriber with id ${id}:`, error)
    throw new Error('Could not fetch subscriber')
  }
}

export const createSubscriber = async (payload) => {
  try {
    const validatedPayload = validateSubscriber(payload)
    return await subscriberModel.createSubscriber(validatedPayload)
  } catch (error) {
    console.error('Error creating subscriber:', error)
    throw new Error('Could not create subscriber')
  }
}

export const deleteSubscriber = async (id) => {
  try {
    return await subscriberModel.deleteSubscriber(id)
  } catch (error) {
    console.error(`Error deleting subscriber with id ${id}:`, error)
    throw new Error('Could not delete subscriber')
  }
}
