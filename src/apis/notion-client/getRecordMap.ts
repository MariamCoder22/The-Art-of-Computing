import { Client } from "@notionhq/client"

/**
 * This function now queries a database instead of a single page.
 * @param {string} databaseId - The Notion Database ID.
 * @returns {Promise<any>} The record map of the queried database.
 */
export const getRecordMap = async (databaseId: string) => {
  // Add auth parameter to the Client constructor
  const api = new Client({
    auth: process.env.NOTION_API_TOKEN
  })

  console.log("Using API Token:", process.env.NOTION_API_TOKEN ? "Token exists" : "Token missing");
  console.log("Using Database ID:", databaseId);

  try {
    // Query the database instead of getting a single page.
    const recordMap = await api.databases.query({
      database_id: databaseId,
    })
    
    return recordMap;
  } catch (error) {
    console.error("Error querying Notion database:", error);
    throw error;
  }
}