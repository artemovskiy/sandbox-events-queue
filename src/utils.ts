import * as amqp from 'amqplib'

export const createAmqpConnection = () => {
  return amqp.connect('amqp://guest:guest@localhost:5672')
}

export const range = (length: number) => {
  const arr: number[] = []
  for (let i = 0; i < length; i++) {
    arr.push(i)
  }
  return arr
}
