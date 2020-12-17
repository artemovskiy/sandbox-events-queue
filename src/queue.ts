import * as amqp from 'amqplib'

export class Queue {

  constructor(
    private readonly channel: amqp.Channel,
    public readonly exchangeName: string,
    private readonly workersCount: number
  ) {
  }

  publishEvent(userId: number, data: any) {
    const event = {
      userId,
      data,
    }
    const key = userId % this.workersCount
    const content = Buffer.from(JSON.stringify(event))
    this.channel.publish(this.exchangeName, key.toString(), content)
  }

}
