import fastify from 'fastify'

const server = fastify()
const { PORT } = process.env

server.get('/', (req, res) => {
  res.status(200).send({ message: 'hello world with Typescript' })
})

server.listen(
  { port: +(PORT ?? 8080) },
  (err, addr) => err ? 
    console.log(err) : 
    console.log(`server running on`, addr))
