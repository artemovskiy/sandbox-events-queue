import {createAmqpConnection, range} from './utils'

import {fork} from './fork'
import {Queue} from './queue'

export class Schedule {

  constructor(
    public readonly workersCount: number
  ) {
  }

  async setupQueue(exchangeName: string) {
    const connection = await createAmqpConnection()
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, 'direct', {
      durable: true,
    })
    await Promise.all(range(this.workersCount).map(routingKey => fork(routingKey.toString())))
    return new Queue(channel, exchangeName, this.workersCount)
  }

}
