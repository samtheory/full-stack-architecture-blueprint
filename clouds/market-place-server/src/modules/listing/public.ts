import { Hono } from "hono";
import { listListingsRoute } from "./list-listings/list-listings.route";
import { createListingRoute } from "./create-listing/create-listing.route";

/**
 * Public surface of the listing module.
 * Other modules / create-app may import from here only.
 */
export function createListingModule() {
  const listing = new Hono();
  listing.route("/", listListingsRoute);
  listing.route("/", createListingRoute);
  return listing;
}