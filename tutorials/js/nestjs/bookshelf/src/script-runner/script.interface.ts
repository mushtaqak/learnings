export default class ScriptInterface {
  constructor() {
    if (!this.run) {
      throw new Error("Script must implement `run` method!");
    }
  }
  run: () => void
}
