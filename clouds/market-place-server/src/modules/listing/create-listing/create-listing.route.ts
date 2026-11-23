import { Hono } from "hono";
import { createListingHandler } from "./create-listing.handler";

export const createListingRoute = new Hono();
createListingRoute.post("/", createListingHandler);