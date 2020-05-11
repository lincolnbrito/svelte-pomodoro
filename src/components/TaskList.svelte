<script>
  import { afterUpdate, createEventDispatcher, tick } from 'svelte'
  import { Task } from '../Task.js'

  const dispatch = createEventDispatcher()

  let taskAddedPendingFocus = false;
  let lastInput;
  let taskSelected;

  export let tasks = [];
  export let disable = false;

  $: allExpectedPomodoros = tasks.reduce(
    (acc, t) => acc + t.expectedPomodoros,
    0
  )

  function handleAddTask() {
    tasks = [...tasks, new Task()]
    taskAddedPendingFocus = true
  }

  function handleRemoveTask(task) {
    const index = tasks.indexOf(task)

    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)]

    // if (get(activeTask) == task) {
    //   selectTask(undefined)
    // }
  }

  function selectTask(task) {
    taskSelected = task;
    dispatch('taskSelected', { task: taskSelected })
  }

  function focusNewTask() {
    if (taskAddedPendingFocus && lastInput) {
      lastInput.focus()
      taskAddedPendingFocus = false
    }
  }

  afterUpdate(focusNewTask)
</script>

{#if tasks.length === 0}
  <p>
    You haven't add any tasks yet. You can do it! Add new tasks and start
    kicking some butt!!
  </p>
{:else}
  <ul>
    {#each tasks as task (task.id)}
      <li class:active={taskSelected === task}>
        <button on:click={() => selectTask(task)} disabled={taskSelected || disable}>&gt;</button>
        <input
          class="description"
          type="text"
          bind:value={task.description}
          bind:this={lastInput} />
        <input
          class="pomodoros"
          type="number"
          bind:value={task.expectedPomodoros}
          disabled={taskSelected}
        />
        <input
          class="pomodoros small"
          bind:value={task.actualPomodoros}
          disabled />
        <button on:click={() => handleRemoveTask(task)} disabled={taskSelected || disable}>X</button>
      </li>
    {/each}

  </ul>
{/if}

<button on:click={handleAddTask} disabled={taskSelected || disable}>Add a new task</button>

{#if tasks.length != 0}
  <p>Today you'll complete {allExpectedPomodoros} pomodoros</p>
{/if}

<style>
  ul {
    list-style: none;
  }

  .description {
    min-width: 400px;
  }

  .pomodoros {
    max-width: 100px;
  }
  .pomodoros.small {
    max-width: 40px;
    text-align: center;
  }
  .active input,
  .active button {
    border-color: orangered;
    background: orangered;
  }
  .active input[disabled] {
    opacity: 0.6;
  }
</style>
