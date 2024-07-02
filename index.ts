import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'

import animaisRoutes from './routes/animais'
import usuariosRoutes from './routes/usuarios'
import loginRoutes from './routes/login'

app.use(express.json())
app.use(cors())
app.use("/animais", animaisRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/login", loginRoutes)

app.get('/', (req, res) => {
  res.send('API do Zoológico: Controle de Animais')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})