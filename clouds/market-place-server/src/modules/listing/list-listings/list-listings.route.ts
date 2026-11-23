import { Hono } from "hono";
import { listListingsHandler } from "./list-listings.handler";

export const listListingsRoute = new Hono();
listListingsRoute.get("/", listListingsHandler);