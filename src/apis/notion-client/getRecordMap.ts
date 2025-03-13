import { NotionAPI } from "notion-client";

/**
 * Fetches the record map of a Notion page or database.
 * @param {string} pageId - The Notion Page or Database ID.
 * @returns {Promise<any>} The record map of the requested Notion page.
 */
export const getRecordMap = async (pageId: string) => {
  try {
    const api = new NotionAPI();
    
    // Fetch the Notion page data
    const recordMap = await api.getPage(pageId);

    if (!recordMap) {
      throw new Error(`Failed to fetch record map for page ID: ${pageId}`);
    }

    return recordMap;
  } catch (error) {
    console.error("Error fetching Notion record map:", error);
    throw error;
  }
};
