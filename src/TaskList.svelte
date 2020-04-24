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
</style>

<script>
  import { afterUpdate } from 'svelte';
  import { Task } from './Task.js';

  let taskAddedPendingFocus = false;
  let lastInput;

  let tasks = [
    new Task('plan some fun trip with Ben and Vico'),
    new Task('buy some flowers to my wife'),
    new Task('write an article about Svelte'),
  ];

  $: allExpectedPomodoros = tasks.reduce(
    (acc, t) => acc + t.expectedPomodoros,
    0,
  );

  function handleAddTask() {
    tasks = [...tasks, new Task()];
    taskAddedPendingFocus = true;
    console.log(tasks);
  }

  function handleRemoveTask(task) {
    const index = tasks.indexOf(task);

    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

    console.log('REMOVE', task);
  }

  function focusNewTask() {
    if (taskAddedPendingFocus && lastInput) {
      lastInput.focus();
      taskAddedPendingFocus = false;
    }
  }

  afterUpdate(focusNewTask);
</script>

{#if tasks.length === 0}
  <p>
    You haven't add any tasks yet. You can do it! Add new tasks and start
    kicking some butt!!
  </p>
{:else}
  <ul>
    {#each tasks as task}
      <li>
        <input
          class="description"
          type="text"
          bind:value="{task.description}"
          bind:this="{lastInput}"
        />
        <input
          class="pomodoros"
          type="number"
          bind:value="{task.expectedPomodoros}"
        />
        <button on:click="{() => handleRemoveTask(task)}">X</button>
      </li>
    {/each}

  </ul>
{/if}

<button on:click="{handleAddTask}">Add a new task</button>

{#if tasks.length != 0}
  <p>Today you'll complete {allExpectedPomodoros} pomodoros</p>
{/if}
