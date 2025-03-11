import { Client } from "@notionhq/client";
import LRU from "lru-cache";

const cache = new LRU<string, any>({
  max: 100, // Max number of items
  ttl: 1000 * 60 * 5, // Cache time-to-live (5 minutes)
});

export const getRecordMap = async (pageIdOrDatabaseId: string) => {
  if (!process.env.NOTION_API_TOKEN) {
    throw new Error("Missing Notion API Token!");
  }

  const cachedResponse = cache.get(pageIdOrDatabaseId);
  if (cachedResponse) {
    console.log("Serving from cache:", pageIdOrDatabaseId);
    return cachedResponse;
  }

  const notion = new Client({ auth: process.env.NOTION_API_TOKEN });

  try {
    const response = await notion.pages.retrieve({ page_id: pageIdOrDatabaseId });
    
    cache.set(pageIdOrDatabaseId, response);
    console.log("Fetched from API:", pageIdOrDatabaseId);

    return response;
  } catch (error: any) {
    console.error("Error accessing Notion:", error);
    throw new Error(`Failed to fetch Notion content: ${error.message}`);
  }
};