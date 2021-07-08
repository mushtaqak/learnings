export default class ScriptRunner {
  async compileScripts() {
    const { exec } = require('child_process');
    await exec(
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
  }

  async loadScripts() {
    // dynamically load scripts
    // works with no webpack - in media scripts
    const SCRIPTS_DIR = '../../../scripts';
    const scripts = await import(SCRIPTS_DIR); // this is needed according to https://stackoverflow.com/questions/58349959/react-dynamic-import-using-a-variable-doesnt-work#answer-58350377 othwerwise doesnt work
    console.log({ scripts });
    return scripts;
  }

  // TODO: read file from medai scripts directory - then we do not need to compile.
  async loadScript(scriptName: string) {
    // dynamically load scripts
    // works with webpack but these scripts are part of dist bundle (Which we do not want)
    // import(`../../scripts/${scriptName}`) compiles these scripts prior to build - so this option may not be useful.

    // use SCRIPTS_DIR when no webpack (webpack: false in nest-cli.json) otherwise this
    // works with no webpack - in media scripts
    const SCRIPTS_DIR = '../../../scripts';
    const script = await import(`${SCRIPTS_DIR}/${scriptName}`); // this works with webpack - this is needed according to https://stackoverflow.com/questions/58349959/react-dynamic-import-using-a-variable-doesnt-work#answer-58350377 othwerwise doesnt work
    console.log({ script });
    return script;
  }

  async run(scriptName: string) {
    // const scripts = await this.loadScripts();
    // const scriptClass = scripts[scriptName].default;
    const scriptModule = await this.loadScript(scriptName);
    const scriptClass = scriptModule.default;
    console.log({ scriptClass });
    const script = new scriptClass();
    console.log({ script });
    script.run();
  }
}
