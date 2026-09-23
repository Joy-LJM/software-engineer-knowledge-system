- SSG(build time) vs SSR(server/request time) vs ISR(server/regenerates after a time interval) vs CSR(browser/runs JavaScript)
  - describes where and when HTML is rendered
  - ISR does not regenerate continuously; with `revalidate: 30`, the first request after 30 seconds can trigger regeneration
- App router vs Pages router
- Server Components vs Client Components
  - S: components in the App Router
    - fetching data
    - accessing server-side resources
    - reducing client JavaScript
    - rendering non-interactive UI
  - C: "use client";
    - browser interaction
    - event handling
    - state management
    - hook
- File-Based Routing
- In Next.js, only serializable values can cross the Server → Client boundary (no functions, no class instances, no Dates without conversion):
  - data objects
  - arrays
  - strings
  - numbers
  - booleans
- server actions
  - `use server`
  - marks an async function as executable on the server
  - a Client Component can call a Server Action, but the function itself runs on the server
- Data Fetching & Caching
  - fetching: `fetch()`
  - caching:
    - `{cache: 'force-cache'}`: explicitly cache the response
    - dynamic: `{cache: 'no-store'}`
    - time-based ISR: `next: { revalidate: N }`
      - First request generates and caches the page.
      - Requests within 30 seconds reuse the cached page.
      - The first request after 30 seconds regenerates it.
    - caching defaults can vary by Next.js version and route; specify the option when behavior matters
- Static rendering vs Dynamic rendering
  - Static rendering:
    - HTML is generated ahead of time or cached and reused for multiple requests.
    - Includes build-time static pages and time-based ISR pages.
    - Good for content that does not need request-specific data.
  - Dynamic rendering:
    - HTML is generated on the server for each request.
    - Use `cache: 'no-store'` when data must be fetched every time.
    - Request-specific APIs such as cookies or headers can also make a route dynamic.
- Server Actions vs Route Handlers
  - Server Actions:
    - async functions marked with `"use server"`
    - invoked through React-integrated mechanisms such as `<form action={addProduct}>`
    - useful for mutations from your application UI
    - still require authentication and server-side validation

    ```
    "use server";

    export async function addProduct(formData: FormData) {
      // validate input
      // mutate data
    }
    ```

  - Route Handlers:
    - HTTP endpoints such as `app/api/users/route.ts`
    - called with `fetch()` or other HTTP clients
    - useful for public APIs, webhooks, mobile clients, or non-React consumers

- Cache Invalidation
  - `updateTag()`
    - Server Actions only
    - immediately expires tagged cache data
    - useful when the user must see their own write immediately

  - `revalidateTag()`
    - invalidates cached data associated with a tag
    - supports stale-while-revalidate behavior with a cache profile
    - usable in Server Actions and Route Handlers

  - `revalidatePath()`
    - invalidates cached data for a route path
    - useful when a mutation affects a specific page

- `useActionState(serverAction, initialState)`
  - a Client Component hook, consumes server action's return value and triggers a re-render
  - returns `[state, formAction]`
  - changes the Server Action signature by adding `previousState`

  ```tsx
  <!-- client component -->
  "use client";

  const [state, formAction] = useActionState(addProduct, null);

  <form action={formAction}>

  <!-- server action file -->
  "use server";

    export async function addProduct(previousState,formData: FormData) {
      // validate input
      // mutate data
    }
  ```

## Day 12: Middleware, Metadata & Image Optimization

### Middleware

- Middleware runs before a request is completed and can inspect or modify the request/response.
- Common uses:
  - authentication and authorization checks
  - redirects and rewrites
  - locale detection
  - adding or reading request headers and cookies
  - blocking unwanted requests
- In the App Router, place `middleware.ts` at the project root, next to `app/`.
- Use `matcher` to limit which paths execute the middleware. Avoid running it for static assets and internal Next.js paths unless needed.

  ```ts
  import { NextResponse } from "next/server";
  import type { NextRequest } from "next/server";

  export function middleware(request: NextRequest) {
    const token = request.cookies.get("session")?.value;

    if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  export const config = {
    matcher: ["/dashboard/:path*"],
  };
  ```

- `NextResponse.next()` continues the request.
- `NextResponse.redirect()` sends the user to another URL.
- `NextResponse.rewrite()` serves another route while keeping the original URL in the browser.
- Middleware is not a replacement for server-side authorization. The Server Action, Route Handler, or database layer must validate permissions again.
- Keep middleware fast. Avoid database calls and large dependencies when a simple cookie, header, or URL check is enough.
- Next.js 16 documentation may refer to this request interception convention as `proxy`; follow the convention required by the installed Next.js version.

### Metadata

- Metadata controls document information such as the page title, description, canonical URL, Open Graph data, and Twitter card data.
- Static metadata is useful when every page in a segment has the same metadata:

  ```ts
  import type { Metadata } from "next";

  export const metadata: Metadata = {
    title: "Products",
    description: "Browse available products",
  };
  ```

- Use `generateMetadata` when metadata depends on route params or fetched data:

  ```ts
  import type { Metadata } from "next";

  type Props = {
    params: Promise<{ id: string }>;
  };

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    return {
      title: `Product ${id}`,
      description: `Details for product ${id}`,
    };
  }
  ```

- In Next.js versions using asynchronous App Router route props, `params` must be awaited.
- Metadata is resolved from parent layouts and pages. More specific child metadata can override or extend parent metadata.
- Do not return arbitrary fields such as `id` from `Metadata`; use supported fields such as `title`, `description`, `openGraph`, and `robots`.
- Avoid putting `<head>` tags directly in a Server Component when the Metadata API can express the same information.
- A unique, descriptive title improves browser usability and search result clarity, but metadata alone does not guarantee a particular search ranking.

### Image Optimization

- Prefer `next/image` over a raw `<img>` for images managed by the application:
  - serves appropriately sized responsive images
  - can use modern formats such as WebP or AVIF when configured and supported
  - lazy-loads images by default when appropriate
  - helps reserve layout space when `width` and `height` or `fill` are provided
  - optimizes image delivery through Next.js

  ```tsx
  import Image from "next/image";

  export default function ProductImage() {
    return (
      <Image
        src="/products/example.jpg"
        alt="Example product"
        width={500}
        height={500}
      />
    );
  }
  ```

- For remote images, configure the exact host in `next.config.ts`:

  ```ts
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.example.com",
          pathname: "/products/**",
        },
      ],
    },
  };

  export default nextConfig;
  ```

- `width` and `height` describe the intrinsic aspect ratio; they do not necessarily determine the rendered CSS size.
- Use `fill` when the image should fill a positioned parent. The parent needs a defined size and usually `position: relative`.
- Use `sizes` for responsive or `fill` images so the browser can choose an efficient resource:

  ```tsx
  <Image
    src="/products/example.jpg"
    alt="Example product"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  ```

- `priority` should be reserved for the likely above-the-fold or Largest Contentful Paint image. Do not mark every image as a priority image.
- Always provide meaningful `alt` text. Use an empty `alt` only for decorative images.
- Image optimization can improve Lighthouse performance, especially LCP, image payload size, and layout stability. Compare Lighthouse runs using the same URL, viewport, network throttling, and build mode.
- Run Lighthouse against a production build when measuring performance:

  ```bash
  npm run build
  npm start
  ```
- Static/prerendered: HTML generated during the build.
- Dynamic/server-rendered: HTML generated when each request arrives.
- Client-side interaction: JavaScript runs in the browser after the page loads.
- Hydration is when React takes the HTML already sent by the server and attaches JavaScript behavior to it in the browser.

