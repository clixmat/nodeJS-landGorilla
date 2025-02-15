import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')
    if (!token) {
        res.status(401).json({ message: 'Acceso denegado' })
        return
    }

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET as string)
        req.user = verified
        next()
    } catch (error) {
        res.status(403).json({ message: 'Token inválido' })
    }
}

export default authenticateJWT
