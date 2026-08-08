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
-