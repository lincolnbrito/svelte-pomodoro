<script>
  import { afterUpdate } from 'svelte';
  import { Task } from './Task.js';

  const tasks = [
    new Task('plan some fun trip with Ben and Vico'),
    new Task('buy some flowers to my wife'),
    new Task('write an article about Svelte')
  ];
</script>

<ul>
  {#each tasks as task, index}
    <li>{task.description}</li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
  }
</style>
