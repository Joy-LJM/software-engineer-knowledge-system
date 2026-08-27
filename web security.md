# Security on FE side
### XSS(Cross-site-scripting):
XSS occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing attackers to execute malicious scripts in the victim's browser context.
1. Types:
   - Stored XSS:Malicious script is permanently stored on the target server (e.g., in a database/comment section) and served to every visiting user.
   - Reflected XSS:Malicious script is reflected off the web server (e.g., in a search query or URL parameter) and executed immediately upon clicking a link.
   - DOM-based XSS:Vulnerability exists entirely client-side; client JavaScript modifies the DOM with unsanitized user input (e.g., document.write(location.hash)).
2. Defenses
   - Context-Aware Output Escaping: Convert special characters (<, >, &, ", ') to HTML entities (&lt;, &gt;, etc.).
   - Sanitization: Use well-tested libraries like DOMPurify before injecting HTML.
   - input validation
   - Content Security Policy (CSP): HTTP header specifying approved origins for executing scripts (e.g., Content-Security-Policy: default-src 'self').(default-src: resource directives;self:source keywords,  it allows resources matching the exact same origin (same protocol, domain, and port))
* React escapes normal rendered values by default
### Cross-Site Request Forgery
CSRF tricks an authenticated user into submitting an unauthorized request to a web application in which they are currently authenticated.
**Mechanism**: Browsers automatically attach cookies (including session cookies) to cross-origin HTTP requests targeting the domain that issued the cookie.
```
Victim logs into bank.com
        ↓
Browser has authentication cookie
        ↓
Victim visits malicious-site.com
        ↓
Malicious page causes request to bank.com
        ↓
Browser may automatically include cookie
```
1. defenses:
   - CSRF token: Use unique, secret, and unpredictable random values assigned to forms and sessions that the server verifies before processing requests.eg:`<input type="hidden" name="csrf-token" value="sdfdfdfd"/>`
   - SameSite Cookies: Set cookie attributes to SameSite=Strict or SameSite=Lax so browsers block cookies from attaching to cross-site requests.
   - checking Origin / Referer where appropriate
### Cross-Origin Resource Sharing (CORS) & Preflight
- CORS is a browser security mechanism that controls whether a web page is allowed to access resources from a different origin.
- same-origin policy:Browser security mechanism that restricts resources loaded from one origin (Protocol + Domain + Port) from interacting with resources from another origin.
```
app.use(cors({
  origin: "http://localhost:3000"
}));
```
- Simple vs. Preflight Requests:
  - Simple Requests: Triggered for GET, HEAD, or POST requests with standard headers (Accept, Content-Type: application/x-www-form-urlencoded, text/plain, multipart/form-data).
  - Preflight Requests (OPTIONS): Browser automatically issues an OPTIONS request before sending the actual request if: 
    1. HTTP Method is PUT, DELETE, PATCH, etc.
    2. Custom HTTP headers are included (e.g., Authorization, X-Custom-Header).
    3. Content-Type is application/json.
- Key CORS Headers:
  - **Access-Control-Allow-Origin**: Specifies permitted origins.
  - **Access-Control-Allow-Methods**: Permitted HTTP methods for preflight.
  - **Access-Control-Allow-Headers**: Permitted headers for preflight.
  - **Access-Control-Allow-Credentials**: Explicitly allows cookies/auth headers across origins.