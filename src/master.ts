import {Schedule} from './schedule'
import {workersCount, exchangeName} from './constants'

;(async () => {
  const schedule = new Schedule(workersCount)
  const queue = await schedule.setupQueue(exchangeName)

  for (let userId = 0; userId < 1000; userId++) {
    const random = Math.round(Math.random() * 9) + 1
    for (let eventId = 0; eventId < random; eventId++) {
      queue.publishEvent(userId, {
        eventId,
      })
    }
  }
})()

