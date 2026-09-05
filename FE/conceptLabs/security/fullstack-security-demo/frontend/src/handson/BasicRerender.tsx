import React from 'react';
function Counter(){
  const [count, setCount] = React.useState(0);
  console.log('Counter rendered');

  return (
    <div>
      <h1>Hello</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child1 count={count}/>
      <Child2 age={1}/>
      <Child3/>
      <Child4/>
      <Child5/>
    </div>
  );
}
// React.memo did a shallow prop comparison, saw no props at all (so nothing changed), and skipped the render.
const Child1 = React.memo(function Child1({count}: {count: number}) {
  console.log("Child 1 render");
  return <h2>Hello Child 1, count: {count}</h2>;
});
const Child2 = React.memo(function Child2({age}:{age: number}) {
  console.log("Child 2 render");
  return <h2>Hello Child 2, age:{age}</h2>;
});

const Child3 = React.memo(function Child1() {
  console.log("Child 3 render");
  return <h2>Hello Child 3</h2>;
});

// component Child4 is not memoized, so it will re-render every time the parent component re-renders when state changes
// function Child4() {
//   console.log("Child 4 render");

//   return <h2>Hello Child 4</h2>;
// }
const Child4 = React.memo(function Child4() {
  console.log("Child 4 render");
  return <h2>Hello Child 4</h2>;
});
const Child5 = React.memo(function Child5() {
  console.log("Child 5 render");
  return <h2>Hello Child 5</h2>;
});
export default Counter