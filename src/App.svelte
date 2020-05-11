<svelte:head>
	<title>{currentTime} | {title}</title>
</svelte:head>

<script>
  import { afterUpdate } from 'svelte';
  import TaskList from './components/TaskList.svelte';
  import Timer from './components/Timer.svelte'
  import { formatTime } from './utils/time';
  import {STATE} from './utils/states';

  export let title;

  const DEFAULT_POMODORO_TIME = 0.2;
  const DEFAULT_LONGBREAK_TIME = 0.1;
  const DEFAULT_SHORTBREAK_TIME = 0.1;

  let currentTime = formatTime(DEFAULT_POMODORO_TIME * 60)
  let currentTask;
  let reset = false;

  let tasks = [
    {
      id: (Math.random()*5).toString(16).substring(2),
      description: "Make some money",
      expectedPomodoros: 1,
      actualPomodoros: 0,
    }
  ];

  function handlePomodoro(e) {
    console.log(e.detail);

    tasks =  tasks.map( task => {
      if(task.id == currentTask.id && e.detail.state == STATE.COMPLETED) {
        task.actualPomodoros++
       }
       return task
    });
    reset = false;

   alert('dfsdf');
    // tasks = tasks.map( task => task.id == currentTask.id ? task.actualPomodoros = e.detail.pomodoros : task);
  }

  function handleTaskSelected(e) {
    console.log('selecionouit');
    reset = true;
    currentTask = e.detail.task;
  }

</script>

<main>
  <h1>{title}!</h1>

  <Timer
    {reset}
    pomodoro={DEFAULT_POMODORO_TIME}
    longbreak={DEFAULT_LONGBREAK_TIME}
    shortbreak={DEFAULT_SHORTBREAK_TIME}
    on:pomodoro={handlePomodoro}
    on:tick={(e) => currentTime = e.detail}
  />
  CURRENT: {currentTask} <br>
  TASKS: {JSON.stringify(tasks)}
  <TaskList bind:tasks={tasks} on:taskSelected={handleTaskSelected} />
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
    /*text-transform: uppercase;*/
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
