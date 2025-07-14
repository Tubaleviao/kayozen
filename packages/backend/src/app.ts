import fastify from 'fastify'

const server = fastify()

server.get('/', (req, res) => {
  res.status(200).send({ message: 'hello world with Typescript' })
})

server.listen(
  {port: 8080}, 
  (err, addr) => err ? 
    console.log(err) : 
    console.log('server running on port 3000', addr))
