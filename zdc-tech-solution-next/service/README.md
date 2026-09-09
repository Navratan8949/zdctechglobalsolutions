# Frontend API services

All functions return the backend response body. Protected endpoints automatically receive the token from `localStorage` through `api.js`, and cookies are sent with requests.

For file uploads, pass a `FormData` instance to `setupAdmin` or `submitJobApplicationWithResume`.

Import services individually or from `service/index.js`.
