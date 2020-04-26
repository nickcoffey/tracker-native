// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
const getFormattedPart = (part: number): string => {
  return `0${part}`.substr(-2)
}

export const getFormattedDate = (unixString: string): string => {
  let dateString = ''
  if (unixString !== '') {
    let unixTime = Number(unixString)
    let date = new Date(unixTime) // time is already in milliseconds
    let month = getFormattedPart(date.getMonth() + 1) // months are 0-11
    let day = getFormattedPart(date.getDate())
    let year = date.getFullYear()
    dateString = `${month}/${day}/${year}`
  }
  return dateString
}

export const getFormattedTime = (unixString: string): string => {
  let timeString = ''
  if (unixString !== '') {
    let unixTime = Number(unixString)
    let date = new Date(unixTime)
    let hours = date.getHours()
    let hh = getFormattedPart(((hours + 11) % 12) + 1)
    let dd = hours >= 12 ? 'PM' : 'AM'
    let minutes = getFormattedPart(date.getMinutes())
    let seconds = getFormattedPart(date.getSeconds())
    timeString = `${hh}:${minutes}:${seconds} ${dd}`
  }
  return timeString
}

export const getFormattedDateTime = (unixString: string): string => {
  let dateTimeString = ''
  if (unixString !== '') {
    let unixTime = Number(unixString)
    let date = new Date(unixTime)
    let month = getFormattedPart(date.getMonth() + 1) // months are 0-11
    let day = getFormattedPart(date.getDate())
    let year = date.getFullYear()
    let hours = date.getHours()
    let hh = getFormattedPart(((hours + 11) % 12) + 1)
    let dd = hours >= 12 ? 'PM' : 'AM'
    let minutes = getFormattedPart(date.getMinutes())
    let seconds = getFormattedPart(date.getSeconds())
    dateTimeString = `${month}/${day}/${year} ${hh}:${minutes}:${seconds} ${dd}`
  }
  return dateTimeString
}

const padDigits = (timeSegment: number): string => ('00' + timeSegment).slice(-2)

export const getTimerFormattedString = (seconds: number): string => {
  let sec = seconds % 60
  seconds = (seconds - sec) / 60
  let mm = seconds % 60
  let hh = (seconds - mm) / 60
  return `${padDigits(hh)}:${padDigits(mm)}:${padDigits(sec)}`
}

export const getDuration = (endUnixStr: string, startUnixStr: string): string => {
  let timeDiff = ''
  if (endUnixStr || startUnixStr) {
    let seconds = Math.floor((Number(endUnixStr) - Number(startUnixStr)) / 1000)
    let sec = seconds % 60
    seconds = (seconds - sec) / 60
    let mm = seconds % 60
    let hh = (seconds - mm) / 60
    timeDiff = `${hh > 0 ? `${padDigits(hh)}:` : ''}${mm ? `${padDigits(mm)}:` : ''}${padDigits(sec)}`
  }
  return timeDiff
}
