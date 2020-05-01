export const minutesToSeconds = minutes => minutes * 60
export const secondsToMinutes = seconds => Math.floor(seconds / 60)
export const padWithZeroes = number => number.toString().padStart(2, '0')
export const formatTime = (timeInSeconds) => {
  const minutes = secondsToMinutes(timeInSeconds)
  const remainingSeconds = timeInSeconds % 60

  return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`
}
