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

  async loadScript(scriptName: string) {
    // 3 options to dynamically load scripts

    // option1: no webpack - everything works. new script files are also being run.
    // (webpack: false in nest-cli.json)
    // works with no webpack - in media scripts
    const SCRIPTS_DIR = '../../../scripts';
    const script = await import(`${SCRIPTS_DIR}/${scriptName}`); // this works with webpack - this is needed according to https://stackoverflow.com/questions/58349959/react-dynamic-import-using-a-variable-doesnt-work#answer-58350377 othwerwise doesnt work

    // option2: works with webpack - script files at build time are only runnable - new script files uploaded at runtime will not be available.
    // (webpack: true in nest-cli.json)
    // works with webpack (not useful)
    // - but these scripts are part of dist bundle (Which we do not want)
    // - also only bundled scripts will be runnable - new scripts uploaded at runtime will not be runnable.
    // import(`../../scripts/${scriptName}`) compiles these scripts prior to build - so this option may not be useful.

    // option3: works with webpack - every time new script file is uploaded - server restarts.
    // (webpack: true in nest-cli.json)
    // FIXME: webpack does not let us import files outside of /dist --> reproduce --> ./nest-cli.json --> webpack: true
    // - [Dynamic Import from external URL will throw Module not found error](https://github.com/webpack/webpack/issues/8341)
    // - [babel 7 does not let us import files outside of dist](https://github.com/babel/babel/issues/8309)
    // const SCRIPTS_DIR = '../../scripts';
    // const script = await import(/* webpackIgnore: true */ `../../scripts/${scriptName}`);

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
