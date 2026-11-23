import type { Context } from "hono";
import { createListing } from "./create-listing";

export async function createListingHandler(c: Context) {
  const body = await c.req.json();
  // Step 04: Zod parse, then:
  // const listing = await createListing(body);
  void createListing;
  void body;
  return c.json({ error: "Not implemented" }, 501);
}