import { NotionAPI } from "notion-client";

/**
 * Fetches the Notion page record map using the Notion Client API.
 * @param {string} pageId - The Notion Page ID.
 * @returns {Promise<any>} - The record map of the Notion page.
 */
export const getRecordMap = async (pageId: string) => {
  try {
    if (!pageId) throw new Error("Page ID is required");
    
    const api = new NotionAPI();
    const recordMap = await api.getPage(pageId);

    if (!recordMap) throw new Error("Failed to fetch the record map");

    return recordMap;
  } catch (error) {
    console.error("Error fetching Notion record map:", error);
    return null; // Prevents crashing by returning null in case of failure
  }
};
