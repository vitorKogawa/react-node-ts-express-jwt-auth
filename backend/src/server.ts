import express from 'express'
import app from './app'

const server = express()
server.use(app)

server.listen(3333, () => console.log('Servidor rodando na porta: ', 3333))
