import { Client } from "@notionhq/client";
import { APIResponseError } from "@notionhq/client/build/src/errors";

export const getRecordMap = async (pageIdOrDatabaseId: string) => {
  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN
  });

  console.log("Using ID:", pageIdOrDatabaseId);
  console.log("API Token exists:", !!process.env.NOTION_API_TOKEN);

  try {
    // Check if this is a database or page by trying to retrieve as database first
    try {
      await notion.databases.retrieve({ database_id: pageIdOrDatabaseId });
      // If no error, it's a database
      const response = await notion.databases.query({
        database_id: pageIdOrDatabaseId
      });
      return response;
    } catch {
      // If error, try as a page
      const response = await notion.pages.retrieve({ 
        page_id: pageIdOrDatabaseId 
      });
      return response;
    }
  } catch (error: unknown) {
    console.error("Error accessing Notion:", error);
    
    // Properly handle the unknown type
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Notion content: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch Notion content: ${String(error)}`);
    }
  }
}