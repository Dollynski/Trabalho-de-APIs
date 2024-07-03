import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'

import jogosRoutes from './routes/jogos'
import usuariosRoutes from './routes/usuarios'
import loginRoutes from './routes/login'

app.use(express.json())
app.use(cors())
app.use("/jogos", jogosRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/login", loginRoutes)

app.get('/', (req, res) => {
  res.send('API de Games: Controle de jogos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})