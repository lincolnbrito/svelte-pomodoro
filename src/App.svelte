<script>
  import TaskList from './TaskList.svelte'
  import PomodoroTimer from './PomodoroTimer.svelte'
  let title = 'Pomodoro Svelte'

  let activeTask
  function updateActiveTask(event) {
    activeTask = event.detail.task
  }
</script>

<main>
  <h1>{title}!</h1>
  <PomodoroTimer {activeTask} />
  <TaskList on:taskSelected={updateActiveTask} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
