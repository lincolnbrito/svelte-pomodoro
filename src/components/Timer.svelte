<svelte:head>
  <title>{formatTime(time)}</title>
</svelte:head>

<script>
  import { createEventDispatcher  } from 'svelte';
  const dispatch = createEventDispatcher();
  import {
    minutesToSeconds,
    secondsToMinutes,
    padWithZeroes,
    formatTime
  } from '../utils/time';
  import { STATE } from '../utils/states'
  import { activeTask } from '../store'

  export let pomodoro = 25;
  export let longbreak = 20;
  export let shortbreak = 5;

  let POMODORO_TIME = minutesToSeconds(pomodoro)
  let LONG_BREAK_TIME = minutesToSeconds(longbreak)
  let SHORT_BREAK_TIME = minutesToSeconds(shortbreak)

  let time = POMODORO_TIME;
  let pomodoros = 0;
  let completed = 0;
  let interval
  let state = STATE.IDLE

  function startPomodoro() {
    state = STATE.IN_PROGRESS;
    dispatch('pomodoro', { state, pomodoros });

    (function tick(){
      interval = setTimeout(() => {
        time -= 1
        if (time == 0) {
          completePomodoro()
        }else {
          tick();
        }
      }, 1000);
    })();

  }

  function completePomodoro() {
    clearTimeout(interval)

    pomodoros++;
    state = STATE.COMPLETED;

    if (pomodoros === 4) {
      completed++;
      dispatch('pomodoro', { state, pomodoros });
      pomodoros = 0;
      rest(LONG_BREAK_TIME)
    } else {
      rest(SHORT_BREAK_TIME)
    }
  }

  function cancelPomodoro() {
    clearInterval(interval)
    state = STATE.CANCELED;
    time = POMODORO_TIME;

    dispatch('pomodoro', { state, pomodoros, completed });
  }

  function rest(restTime) {
    state = STATE.RESTING;
    dispatch('pomodoro', { state, pomodoros });
    time = restTime;

    (function tick(){
      interval = setTimeout(() => {
        time -= 1
        if (time == 0) {
          idle();
        }else {
          tick();
        }
      }, 1000);
    })();
  }

  function idle() {
    clearTimeout(interval)
    state = STATE.IDLE
    time = POMODORO_TIME;

    dispatch('pomodoro', { state, pomodoros });
  }
</script>

<section>
  pomodoros: {pomodoros}
  state: {state}
  <time>{formatTime(time)}</time>
  <button
    on:click={startPomodoro}
    disabled={state == STATE.IN_PROGRESS || state == STATE.RESTING}
    >
    Start
  </button>
  <button
    on:click={cancelPomodoro}
    disabled={state == STATE.IDLE || state == STATE.CANCELED}>
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
