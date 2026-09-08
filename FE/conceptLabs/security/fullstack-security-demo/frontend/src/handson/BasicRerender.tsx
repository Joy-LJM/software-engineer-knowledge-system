import React from 'react';
function Counter(){
  const [count, setCount] = React.useState(0);
  console.log('Counter rendered');
  function handleIncrement() {
    // setCount((prevCount) => prevCount + 1);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count,'count')
  }
  return (
    <div>
      <h1>Hello</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <Child1 count={count}/>
      <Child2 age={1}/>
      <Child3/>
      <Child4/>
      <Child5/>
    </div>
  );
}
// the reason React.memo bails out is that on re-render, React compares the new props to the old props (shallow equality) before calling the child's function body at all — if they're the same, it reuses the previous Fiber output entirely and skips the render.
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