import {createAmqpConnection} from './utils'
import {exchangeName, readyMsg} from './constants'

if (typeof process.env.ROUTING_KEY !== 'string') {
  throw new Error('invalid routing key')
}
const routingKey = process.env.ROUTING_KEY

;(async () => {
  const connection = await createAmqpConnection()
  const channel = await connection.createChannel()
  const queue = await channel.assertQueue('', {
    exclusive: true,
  })
  await channel.bindQueue(queue.queue, exchangeName, routingKey)
  process.send(readyMsg)
  await channel.consume(queue.queue, ({content}) => {
    const event = JSON.parse(content.toString('utf8'))
    setTimeout(() => {
      console.log(JSON.stringify({
        event,
      }))
    }, 1000)
  })
})()
