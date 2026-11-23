import { createApp } from "./create-app";

const port = Number(process.env.PORT ?? 3000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

const app = createApp({ corsOrigin });

export default {
  port,
  fetch: app.fetch,
};

console.log(`market-place-server listening on http://localhost:${port}`);