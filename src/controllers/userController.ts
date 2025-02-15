import bcrypt from 'bcryptjs'
import { Request, RequestHandler, Response } from 'express'
import jwt from 'jsonwebtoken'
import users from '../models/userModel'
import userSchema from '../validators/userValidator'

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = userSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({ username: req.body.username, password: hashedPassword })

        res.status(201).json({ message: 'Usuario registrado' })
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = users.find((u) => u.username === req.body.username)
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            res.status(400).json({ message: 'Credenciales incorrectas' })
        }

        const token = jwt.sign({ username: user?.username }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        })

        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

export const getUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    res.json(users.map((user) => ({ username: user.username })))
}

export const updateUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = users.find((u) => u.username === req.params.username)
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' })
            return
        }

        const { error } = userSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return
        }

        user.username = req.body.username
        user.password = bcrypt.hashSync(req.body.password, 10)

        res.json({ message: 'Usuario actualizado exitosamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

export const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const index = users.findIndex((user) => user.username === req.params.username)
        if (index === -1) {
            res.status(404).json({ message: 'Usuario no encontrado' })
            return
        }

        users.splice(index, 1)

        res.json({ message: 'Usuario eliminado exitosamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
