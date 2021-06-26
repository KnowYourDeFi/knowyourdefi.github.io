import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const hourlyTimestamps = (days = 7) => {
    const currentHour = dayjs().startOf('hour').utc().unix()
    let time = currentHour - days * 24 * 3600
    const timestamps = []
    while (time <= currentHour) {
        timestamps.push(time)
        time += 3600
    }
    return timestamps
}