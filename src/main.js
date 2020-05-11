import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    title: 'Pomodoro Svelte'
  }
});

export default app;
