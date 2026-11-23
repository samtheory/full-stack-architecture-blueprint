export type ListListingsResult = {
  items: unknown[];
};

export async function listListings(): Promise<ListListingsResult> {
  // Step 04: call ListingRepository port
  return { items: [] };
}