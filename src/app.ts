import dotenv from 'dotenv'
import express from 'express'
import userRoutes from './routes/userRoutes'

dotenv.config()
const app = express()

app.use(express.json())
app.use('/api', userRoutes)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Error interno del servidor' })
})

export default app
