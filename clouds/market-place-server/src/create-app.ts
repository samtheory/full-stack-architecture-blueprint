import { Hono } from "hono";
import { cors } from "hono/cors";
import { createListingModule } from "./modules/listing/public";

export type CreateAppDeps = {
  corsOrigin: string;
  // db?: Db;  // added in step 03
};

export function createApp(deps: CreateAppDeps) {
  const app = new Hono();

  app.use("*", cors({ origin: [deps.corsOrigin] }));

  app.get("/health", (c) =>
    c.json({ ok: true as const, service: "market-place-server" }),
  );

  app.route("/v1/listings", createListingModule());

  return app;
}