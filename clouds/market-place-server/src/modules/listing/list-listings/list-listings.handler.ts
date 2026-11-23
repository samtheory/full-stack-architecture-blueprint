import type { Context } from "hono";
import { listListings } from "./list-listings";

export async function listListingsHandler(c: Context) {
  const result = await listListings();
  return c.json(result);
}