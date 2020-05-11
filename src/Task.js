export class Task {
  constructor(description = "", expectedPomodoros = 1) {
    this.id = (Math.random() * 5).toString(16).substring(2);
    this.description = description;
    this.expectedPomodoros = expectedPomodoros;
    this.actualPomodoros = 0;
  }
}
