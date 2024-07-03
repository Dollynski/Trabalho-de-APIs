import { PrismaClient } from "@prisma/client"
import { Router } from "express"

import { verificaToken } from "../middewares/verificaToken"

const prisma = new PrismaClient()

async function main() {
  prisma.$use(async (params, next) => {
    if (params.model == 'Animal') {
      if (params.action == 'delete') {
        params.action = 'update'
        params.args['data'] = { deleted: true }
      }
    }
    return next(params)
  })
}
main()

const router = Router()

router.get("/", async (req, res) => {
  try {
    const jogos = await prisma.animal.findMany({
      where: { deleted: false }
    })
    res.status(200).json(jogos)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", verificaToken, async (req: any, res) => {
  const { nome, genero, preco } = req.body
  const { userLogadoId } = req

  if (!nome || !genero || !preco) {
    res.status(400).json({ erro: "Informe nome, gênero e preço do jogo" })
    return
  }

  try {
    const animal = await prisma.animal.create({
      data: { nome, genero, preco, usuarioId: userLogadoId }
    })
    res.status(201).json(animal)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", verificaToken, async (req: any, res) => {
  const { id } = req.params

  try {
    const animal = await prisma.animal.delete({
      where: { id: Number(id) }
    })

    await prisma.log.create({
      data: {
        descricao: "Exclusão de Jogo",
        complemento: `Usuário: ${req.userLogadoNome}`,
        usuarioId: req.userLogadoId
      }
    })

    res.status(200).json(animal)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", verificaToken, async (req, res) => {
  const { id } = req.params
  const { nome, genero, preco } = req.body

  if (!nome || !genero || !preco ) {
    res.status(400).json({ erro: "Informe nome, gênero e preço do jogo" })
    return
  }

  try {
    const animal = await prisma.animal.update({
      where: { id: Number(id) },
      data: { nome, genero, preco }
    })
    res.status(200).json(animal)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router