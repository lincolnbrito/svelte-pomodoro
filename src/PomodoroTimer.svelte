<script>
  import { activeTask } from './tasksStore.js'

  const minutesToSeconds = minutes => minutes * 60
  const secondsToMinutes = seconds => Math.floor(seconds / 60)
  const padWithZeroes = number => number.toString().padStart(2, '0')

  // length of a pomodoro in seconds
  const POMODORO_S = minutesToSeconds(0.5)
  const LONG_BREAK_S = minutesToSeconds(1)
  const SHORT_BREAK_S = minutesToSeconds(1)
  const State = { idle: 'idle', inProgress: 'in progress', resting: 'resting' }

  let pomodoroTime = POMODORO_S
  let completedPomodoros = 0
  let interval
  let currentState = State.idle

  function formatTime(timeInSeconds) {
    const minutes = secondsToMinutes(timeInSeconds)
    const remainingSeconds = timeInSeconds % 60

    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`
  }

  function completePomodoro() {
    clearInterval(interval)

    $activeTask.actualPomodoros++
    completedPomodoros++

    if (completedPomodoros === 4) {
      rest(LONG_BREAK_S)
      completedPomodoros = 0
    } else {
      rest(SHORT_BREAK_S)
    }

    console.log($activeTask)
  }

  function startPomodoro() {
    console.log($activeTask)
    currentState = State.inProgress
    interval = setInterval(() => {
      if (pomodoroTime == 0) {
        completePomodoro()
      }
      pomodoroTime -= 1
    }, 1000)
  }

  function cancelPomodoro() {
    idle()
  }

  function rest(time) {
    currentState = State.resting
    pomodoroTime = time

    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        idle()
      }
      pomodoroTime -= 1
    }, 1000)
  }

  function idle() {
    currentState = State.idle
    clearInterval(interval)
    pomodoroTime = POMODORO_S
  }
</script>

<section>
  <time>{formatTime(pomodoroTime)}</time>
  <button
    on:click={startPomodoro}
    disabled={currentState !== State.idle || !$activeTask}>
    Start
  </button>
  <button
    on:click={cancelPomodoro}
    disabled={currentState !== State.inProgress || !$activeTask}>
    Cancel
  </button>
</section>

<style>
  time {
    display: block;
    font-size: 5em;
    font-weight: 300;
    margin-bottom: 0.2em;
  }
</style>
