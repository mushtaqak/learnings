# Error handling in react

### Error boundary
1. Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
2. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them

You can create an error boundary class component by defining a new lifecycle method `componentDidCatch(error, errorInfo)`

```javascript
componentDidCatch(error, errorInfo) {
  // Do something here
}
```

Read more: https://medium.com/@sgroff04/2-minutes-to-learn-react-16s-componentdidcatch-lifecycle-method-d1a69a1f753
