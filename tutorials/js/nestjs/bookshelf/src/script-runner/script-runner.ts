export default class ScriptRunner {
  loadScripts() {
    const scripts = require('./scripts');
    console.log({ scripts });
    return scripts;
  }
  getAllScripts() {
    return this.loadScripts();
  }
  run(scriptName: string) {
    const scripts = this.loadScripts();
    const scriptClass = scripts[scriptName].default;
    console.log({ scriptClass });
    const script = new scriptClass();
    console.log({ script });
    script.run();
  }
}
