import * as userService from './user.service.js'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userService.getUserById(id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const payload = req.body
    const newUser = await userService.createUser(payload)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const payload = req.body
    const updatedUser = await userService.updateUser(id, payload)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    await userService.deleteUser(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const payload = req.body
    const result = await userService.loginUser(payload)
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
