import { useState, useEffect } from "react";
import "./App.css";
import BasicRerender from "./handson/BasicRerender";
import { ProductPage } from "./handson/ProductPage";

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setError(await res.text());
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section id="center">
        <h1 style={{color:'green'}}>Users</h1>
        <div>
          {users.map((user) => (
            <p key={user.id}>
              {user.id}:{user.name}
            </p>
          ))}
          {error && <p style={{color:'red'}}>{error}</p>}
        </div>
  
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        {/* <BasicRerender /> */}
        <ProductPage/>
      </section>

    </>
  );
}

export default App;
