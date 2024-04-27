import express from 'express'
import { PORT } from './config/config.js'
import usuariosRoutes from './routes/usuarios.routes.js'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  const { origin } = req.headers
  const permitidos = ['http://127.0.0.1:5501']

  if (permitidos.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    next()
  }
})

app.use(usuariosRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
