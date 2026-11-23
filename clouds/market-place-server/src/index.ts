import { Hono } from "hono";
import { cors } from "hono/cors";

const port = Number(process.env.PORT ?? 3000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: [corsOrigin],
  }),
);

app.get("/health", (c) => c.json({ ok: true, service: "market-place-server" }));

export default {
  port,
  fetch: app.fetch,
};

console.log(`market-place-server listening on http://localhost:${port}`);
