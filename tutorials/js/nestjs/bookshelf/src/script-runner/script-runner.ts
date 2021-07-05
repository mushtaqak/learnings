export default class ScriptRunner {
  async loadScripts() {
    // const scripts = require();
    // dynamically load scripts
    const scriptDir = './scripts'; // this is needed according to https://stackoverflow.com/questions/58349959/react-dynamic-import-using-a-variable-doesnt-work#answer-58350377 othwerwise doesnt work
    const scripts = await import(scriptDir);
    console.log({ scripts });
    return scripts;
  }
  getAllScripts() {
    return this.loadScripts();
  }
  async run(scriptName: string) {
    const scripts = await this.loadScripts();
    const scriptClass = scripts[scriptName].default;
    console.log({ scriptClass });
    const script = new scriptClass();
    console.log({ script });
    script.run();
  }
}
