# Console log in react

1. Create a `ConsoleLog` component.
```
const ConsoleLog = ({ children }) => {
  console.log(children);
  return false;
};
```
2. Then use it.
```javascript
render() {
  return (
    <div>
      <h1>List of todos</h1>
      <ConsoleLog>{ this.props.todos }</ConsoleLog>
    </div>
  );
}
```

Or Place your `console.log` before the return():   
```javascript
render() {
  console.log(this.props.todos);
  return (
    <div>
      <h1>List of todos</h1>
    </div>
  );
}
```

Read more: https://medium.com/javascript-in-plain-english/can-you-console-log-in-jsx-732f2ad46fe1
