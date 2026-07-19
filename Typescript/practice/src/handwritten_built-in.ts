// Omit
// The Strategy:

// You need to map over all the keys of T using [P in keyof T].  

// You need to filter out keys that belong to K. We do this using Key Remapping with the as clause.  

// Inside the as clause, check if the current key P is assignable to K (P extends K).  

// If it is, return never (which filters it out of the object keys); otherwise, keep P.
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
interface User{
  id:string;
  name:string;
  age:number;
}
type UserwithoutAge=MyOmit<User,'age'>; // Equivalent to: { id: string; name: string; }

// DeepReadonly
// The Strategy:

// First, check if the type is a Function. If it is, return it as-is because functions are technically JS objects, but mapping them recursively would break their call signatures.  

// Check if the type is a standard object. If it is, use a mapped type to prepend the readonly modifier to each key, and recursively call DeepReadonly on the value.  

// If it is a primitive type (like string, number, or boolean), return it unchanged.
type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
    ? {
        readonly [P in keyof T]: DeepReadonly<T[P]>;
      }
    : T;
interface Person {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
  hobbies: string[];
}

type ReadonlyPerson = DeepReadonly<Person>; // Equivalent to:
/*
{
  readonly name: string;
  readonly age: number;
  readonly address: {
    readonly street: string;
    readonly city: string;
  };
  readonly hobbies: readonly string[];
}
*/
const person: ReadonlyPerson = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
  },
  hobbies: ["reading", "traveling"],
};  
//person.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property.

