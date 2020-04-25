// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
const getFormattedPart = (part: number): string => {
  return `0${part}`.substr(-2)
}

const getFormattedDate = (unixString: string): string => {
  let dateString = ''
  if (unixString !== '') {
    let unixTime = Number(unixString)
    let date = new Date(unixTime) // time is already in milliseconds
    let month = getFormattedPart(date.getMonth())
    let day = getFormattedPart(date.getDate())
    let year = date.getFullYear()
    let hours = getFormattedPart(date.getHours())
    let minutes = getFormattedPart(date.getMinutes())
    let seconds = getFormattedPart(date.getSeconds())
    dateString = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}` // Will display time in 10:30:23 format
  }
  return dateString
}

export default getFormattedDate
