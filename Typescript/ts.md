### Generics & Constraints
  - Generics allow you to define functions, interfaces, or classes without specifying specific types in advance. The types can be specified at runtime. The `extends` keyword can be used to add constraints to generics.

    ```typescript
    // 约束 T 必须包含 id 属性，避免无序输入
    function logEntity<T extends {id:string}>(entity:T):void{
        console.log(entity.id)
    }
    // keyof: get the property of T and save it as union type
    type MyPick<T, K extends keyof T>={
        [key in K]: T[key]
    }
    ```


- At the type level, `extends` behaves like an `if/else` statement. **Syntax:** `T extends U ? X : Y`

  ```
  type IsString<T>=T extends string? true:false;
  type A = IsString<string>
  type B = IsString<number>
  ```

- `infer`: 

  - The `infer` keyword allows you to extract and declare a temporary type variable inside a conditional clause. It can *only* be used within the `extends` clause of a conditional type

    ```
    //ypeScript looks at the function T, infers its return type, binds it to the placeholder R, and returns R
    type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
    ```
- Distributive Conditional Types
    - When conditional types act on a generic type parameter that is a union, they distribute automatically.
    
      ```
      type ToArray<T> = T extends any ? T[] : never;
      type Result = ToArray<string | number>; // Evaluates to string[] | number[]
      ```
    

- Recursive Mapped Types

  - You can iterate over the keys of an object using mapped types. If you call the mapper type inside itself, it becomes recursive, allowing you to manipulate deeply nested structures.

  - Using the `as` keyword, you can filter, rename, or convert key names during the mapping process.

    ```
    // 将对象的所有键名转换为大写
    type UppercaseKeys<T> = {
      [K in keyof T as Uppercase<string & K>]: T[K] // & symbol: type intersection, to constrain K as string type
    };
    ```

    