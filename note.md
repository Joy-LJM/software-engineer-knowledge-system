## FE

- Execution Context, Scope chain and closures
  
  - https://www.freecodecamp.org/news/how-javascript-works-behind-the-scene-javascript-execution-context/
- debounce and throttle
  
  - https://share.google/aimode/XCRKVLsSTRRanC73n
- Promise
  
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
- prototype and inheritance
  - https://medium.com/@kevincennis/prototypal-inheritance-781bccc97edb
  - https://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
- browser rendering path
  - DOM construction: request html from server --> parse html from raw bytes(0,1) and convert into characters based on utf charset --> Tokenization(characters into HTML tag)--> NodeList-->DOM
  - CSSOM construction: parse css --> build cssom(h1{
    color:red;
    font-size:32px;
    })
  - render tree: DOM+CSSDOM
  - Layout (Reflow): Calculates geometric details (position, dimensions) for visible elements.
  - Paint: Fills in pixels (text, colors, shadows, borders) into separate visual layers.
  - Composite: GPU-assisted layer composition for final screen rendering.
  - Pixels on screen
- CSR(client side render;including SPAs like React/Vue ), SSR(server side render; Next.js; better SEO), SSG(static site generation), ISR(incremental static regeneration)
  ```react
  <!-- CSR example: fetches data from an API and dynamically updates the DOM once the data is available. -->
  import React, { useState, useEffect } from 'react';
  function App() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.example.com/data');
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    return (
        <div>
            {data ? <p>Data: {data}</p> : <p>Loading...</p>}
        div>
    );
  }
  export default App;
  ```

