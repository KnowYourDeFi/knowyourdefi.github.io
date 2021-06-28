import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

//April 5, 2021 9:00:00 AM GMT
const liquityEpochHourTimestamp = 1617613200

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

//Get evenly separated timestamps since the Liquity epoch hour, 
//append current timestamp if the last element is more than 1 hour ago
export const timestampsSinceLiquityEpoch = (hourInterval = 3) => {
    let timestamp = liquityEpochHourTimestamp
    const result = [timestamp]
    //Minus 300 seconds to make sure there is a block in the period
    const now = nowTimestamp()
    while ((timestamp += hourInterval * 3600) < now) {
        result.push(timestamp)
    }
    //If the last element is more than 1 hour ago
    if (result[result.length - 1] - now > 3600) {
        //Minus 300 seconds to make sure there is valid block after this timestamp
        result.push(now - 300)
    }
    return result
}

export const nowTimestamp = () => {
    return dayjs().utc().unix()
}

export const formatDate = (timestamp, formatStr) => {
    const date = dayjs.unix(timestamp)
    return date.format(formatStr)
}