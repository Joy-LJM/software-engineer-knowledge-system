// core generics and constraints
function obj<T extends { id: string }>(a: T): void {
  console.log(a.id);
}

// conditional types and infer
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type A = UnwrapPromise<Promise<string>>;

// mapped and recursive types
// property is primitive type? function? object
type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
    ? {
        readonly [P in keyof T]: DeepReadonly<T[P]>;
      }
    : T;

// Safe Fetching & Error States
// 1. define the shapes of api response
interface UserData {
  id: number;
  name: string;
  age: number;
}
// 2. create a discriminated union for type narrowing
type FetchResponse<T> =
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: string };
//3.mock secureFetch function using dummy json endpoint
async function secureFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<FetchResponse<T>> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = (await res.json()) as T;
    return { status: "success", data, error: null };
  } catch (err) {
    return {
      status: "error",
      data: null,
      error: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
}
// 4. usage with type narrowing
async function runDemo(){
  const res=await secureFetch<UserData>('https://jsonplaceholder.typicode.com/users');
  if(res.status==='success'){
    console.log(res)
    // console.log(res.data.name);
  }else{
    console.error('failed to fetch data',res.error)
  }
}
runDemo();