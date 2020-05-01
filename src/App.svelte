<script>
  import TaskList from './components/TaskList.svelte'
  import Timer from './components/Timer.svelte'
  let title = 'Pomodoro Svelte'

  function handleCompleted(e) {
    console.log(e.detail);
  }
</script>

<main>
  <h1>{title}!</h1>
  <Timer pomodoro={0.2} longbreak={0.1} shortbreak={0.1} on:pomodoro={handleCompleted} />
  <TaskList />
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
