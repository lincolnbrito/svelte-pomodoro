<script>
  export let type = 'message';
</script>

<div class="{type}">
  <slot name="title" />
  <slot />
</div>

<style>
  .message {
    background: yellow;
    border: 1px solid #000;
    border-radius: 5px;
  }
</style>
