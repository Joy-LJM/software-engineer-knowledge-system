import React from 'react';
function Counter(){
  const [count, setCount] = React.useState(0);
  console.log('Counter rendered');
  return (
    <div>
      <h1>Hello</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child/>
    </div>
  );
}
function Child() {
  console.log("Child render");

  return <h2>Hello Child</h2>;
}
export default Counter