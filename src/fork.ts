import * as cluster from 'cluster'

import {readyMsg} from './constants'

export const fork = async (routingKey: string) => {
  const worker = cluster.fork({
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    ROUTING_KEY: routingKey,
  })
  const successPromise = new Promise<cluster.Worker>(resolve => {
    worker.on('message', msg => {
      if(msg === readyMsg) {
        resolve(worker)
      }
    })
  })
  const errorPromise = new Promise<void>((resolve, reject) => {
    worker.on('error', reject)
  })
  const timeoutPromise = new Promise<void>((resolve, reject) => setTimeout(() => {
    reject(new Error('process spawn timed out, routing key: ' + routingKey))
  }, 10000))
  return Promise.race([successPromise, errorPromise, timeoutPromise])
}
