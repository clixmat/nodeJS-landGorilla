import express from 'express'
import { deleteUser, getUsers, login, register, updateUser } from '../controllers/userController'
import authenticateJWT from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/users', authenticateJWT, getUsers)
router.put('/users/:username', authenticateJWT, updateUser)
router.delete('/users/:username', authenticateJWT, deleteUser)

export default router
