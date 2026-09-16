- React 18
  - Automatic Batching
    - Batching means React groups multiple state updates together and processes them in a single render.
    - introduced automatic batching, which allows React to group multiple state updates from more types of events and asynchronous callbacks into a single render.
    - React 18 provides automatic batching for many state updates, allowing multiple updates to be processed together and usually resulting in fewer renders.
    - In React 17, batching mainly happened inside React event handlers. In React 18, automatic batching was expanded to include updates from asynchronous contexts, such as setTimeout callbacks and promises.
  ```
  function handleClick() {
  setCount(prev => prev + 1);
  setName("John");
  setLoading(false);
}
  ```
  ```
  <!-- React architecture -->
  User interaction / async callback
             ↓
        setState()
             ↓
     React schedules update
             ↓
       Automatic batching
             ↓
      Render phase(React performs the calculation/reconciliation work)
             ↓
     Reconciliation/Fiber(React determines what changed between old and new UI)
             ↓
       Commit phase(React applies necessary changes to the actual DOM)
             ↓
       DOM updates
  ```
  ```
  React.memo
      ↓
   some unnecessary child renders

  Zustand selector
      ↓
   to only relevant state

  useMemo
      ↓
  Avoid unnecessary expensive calculations

  useCallback
      ↓
  Keep function references stable when useful
```
