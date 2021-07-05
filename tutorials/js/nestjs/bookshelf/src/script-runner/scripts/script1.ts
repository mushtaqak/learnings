// const ScriptInterface = require('../script.interface');
import ScriptInterface from '../script.interface';

export default class Script1 {
  constructor() {
    // super();
    console.log('Hello script1 constructor function here!');
  }
  foo = () => {
    console.log('Hello script1 foo function here!');
  };
  run = () => {
    console.log('*** running script1 ***');
    this.foo();
  };
}
