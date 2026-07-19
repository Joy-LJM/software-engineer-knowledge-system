// define a union type(Discriminated Union)
export type ApiResponse<T> =
  | {
      status: "success";
      data: T;
      error: null;
    }
  | {
      status: "error";
      data: null;
      error: {
        code: string;
        message: string;
      };
    };

async function safeFetchInterceptor<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      return {
        status: "error",
        data: null,
        error: {
          code: res.status.toString(),
          message: `server responded with status ${res.status}`,
        },
      };
    }
    //后端返回的原始数据在未经验证前，先标定为 unknown，防止代码 Assumption 错误
    const rawData: unknown = await res.json();
    if (rawData === null || rawData === undefined) {
      return {
        status: "error",
        data: null,
        error: {
          code: "EMPTY_BODY",
          message: "No data returned from server",
        },
      };
    }
    return {
      status: "success",
      data: rawData as T,
      error: null,
    };
  } catch (err) {
    return {
      status: "error",
      data: null,
      error: {
        code: "NETWORK_ERROR",
        message: err instanceof Error ? err.message : "Unknown error",
      },
    };
  }
}
interface UserProfile{
  id: string;
  name: string;
  email: string;
}
async  function getUserInfo(){
  const res=await safeFetchInterceptor<UserProfile[]>('https://jsonplaceholder.typicode.com/users');
  // user type narrowing check status before access data
  if(res.status==='success'){
    console.log(`welcome back, ${res.data[0]?.name}`);
  }else{
    console.error(`Error [${res.error.code}]: ${res.error.message}`);
  }
}
getUserInfo()
