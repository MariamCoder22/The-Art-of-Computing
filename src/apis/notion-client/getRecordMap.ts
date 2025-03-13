import { NotionAPI } from "notion-client";

/**
 * Fetches the record map of a Notion page.
 * @param {string} pageId - The Notion Page ID.
 * @returns {Promise<any | null>} - The record map or null if an error occurs.
 */
export const getRecordMap = async (pageId: string) => {
  try {
    const api = new NotionAPI();
    const recordMap = await api.getPage(pageId);

    if (!recordMap || Object.keys(recordMap).length === 0) {
      console.warn("Warning: The record map is empty or invalid.");
      return null;
    }

    return recordMap;
  } catch (error) {
    console.error("Error fetching Notion page record:", error);
    return null; // Return null to prevent breaking UI logic
  }
};
