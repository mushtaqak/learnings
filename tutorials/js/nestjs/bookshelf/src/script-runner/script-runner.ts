export default class ScriptRunner {

  async compileScripts() {
    const { exec } = require('child_process');
    const isCompiled = await exec(
      'nest build --tsc',
      (error, stdout, stderr) => {
        if (error) {
          console.log(`nest build error: ${error.message}`);
          return false;
        }
        if (stderr) {
          console.log(`nest build stderr: ${stderr}`);
          return false;
        }
        console.log(`nest build stdout: ${stdout}`);
        console.log('nest build scripts compiled');
        return true;
      },
    );
    return isCompiled;
  }

  async loadScripts() {
    // dynamically load scripts
    const SCRIPTS_DIR = '../../scripts'; // this is needed according to https://stackoverflow.com/questions/58349959/react-dynamic-import-using-a-variable-doesnt-work#answer-58350377 othwerwise doesnt work
    const scripts = await import(SCRIPTS_DIR);
    // const scripts = require(scriptDir);
    console.log({ scripts });
    return scripts;
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
