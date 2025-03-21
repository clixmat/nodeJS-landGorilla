import dotenv from 'dotenv'
import express from 'express'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/v1', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
