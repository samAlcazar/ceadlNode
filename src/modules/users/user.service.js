import * as userModel from './user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateUser, validateUserUpdate, validateLogin } from './user.validator.js'

export const getAllUsers = async () => {
  try {
    return await userModel.getAllUsers()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Could not fetch users')
  }
}

export const getUserById = async (id) => {
  try {
    return await userModel.getUserById(id)
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error)
    throw new Error('Could not fetch user')
  }
}

export const createUser = async (payload) => {
  const { nickName, name, password } = payload
  try {
    const validatedPayload = validateUser({ nickName, name, password })
    const passwordHash = await bcrypt.hash(validatedPayload.password, 10)
    const result = await userModel.createUser({
      nickName: validatedPayload.nickName,
      name: validatedPayload.name,
      passwordHash
    })
    return result
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Could not create user')
  }
}

export const updateUser = async (id, payload) => {
  try {
    const validatedPayload = validateUserUpdate(payload)
    const passwordHash = await bcrypt.hash(validatedPayload.password, 10)
    return await userModel.updateUser(id, {
      nickName: validatedPayload.nickName,
      name: validatedPayload.name,
      passwordHash
    })
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error)
    throw new Error('Could not update user')
  }
}

export const deleteUser = async (id) => {
  try {
    return await userModel.deleteUser(id)
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error)
    throw new Error('Could not delete user')
  }
}

export const getUserByNickName = async (nickName) => {
  try {
    return await userModel.getUserByNickName(nickName)
  } catch (error) {
    console.error(`Error fetching user with nickName ${nickName}:`, error)
    throw new Error('Could not fetch user')
  }
}

export const loginUser = async (payload) => {
  try {
    const { nickName, password } = validateLogin(payload)
    const user = await userModel.getUserByNickName(nickName)

    if (!user) {
      throw new Error('Invalid credentials')
    }
    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      throw new Error('Invalid credentials')
    }
    const token = jwt.sign(
      {
        id: user.id_user,
        nickName: user.nick_name
      },
      process.env.JWT_SECRET || 'defaultsecret',
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      }
    )
    return {
      user: {
        id: user.id_user,
        nickName: user.nick_name,
        name: user.name
      },
      token
    }
  } catch (error) {
    console.error('Error logging in user:', error)
    throw new Error('Could not log in user')
  }
}
