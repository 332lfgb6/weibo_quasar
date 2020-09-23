export const formatTime = timeString => {
  if (timeString) {
    timeString = timeString.replace('T', ' ')
    timeString = timeString.replace('Z', ' ')
    const updateDatetime = new Date(timeString)
    const currentDatetime = new Date()
    const updateTimestamp = updateDatetime.getTime()
    const currentTimestamp = currentDatetime.getTime()
    const temp = currentTimestamp - updateTimestamp
    if ((temp) < (60 * (10 ** 3))) {
      return '刚刚'
    }
    if (temp < 60 * 60 * 10 ** 3) {
      return `${currentDatetime.getMinutes() - updateDatetime.getMinutes()}分钟前`
    }
    if (temp < 24 * 60 * 60 * 10 ** 3) {
      return `${currentDatetime.getHours() - updateDatetime.getHours()}小时前`
    }
    // 单个数字前面补0
    let hour = updateDatetime.getHours()
    if (hour < 10) {
      hour = `0${updateDatetime.getHours()}`
    }
    let minute = updateDatetime.getMinutes()
    if (minute < 10) {
      minute = `0${updateDatetime.getMinutes()}`
    }
    if (temp < 48 * 60 * 60 * 10 ** 3) {
      return `昨天 ${hour}:${minute}`
    }
    if (currentDatetime.getFullYear() === updateDatetime.getFullYear()) {
      return `${updateDatetime.getMonth() + 1}-${updateDatetime.getDate()} ${hour}:${minute}`
    }
    return `${updateDatetime.getFullYear()}-${updateDatetime.getMonth() + 1}-${updateDatetime.getDate()}`
  }
}
