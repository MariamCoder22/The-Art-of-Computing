import { Client } from "@notionhq/client"

/**
 * This function now queries a database instead of a single page.
 * @param {string} databaseId - The Notion Database ID.
 * @returns {Promise<any>} The record map of the queried database.
 */
export const getRecordMap = async (databaseId: string) => {
  const api = new Client()

  // Query the database instead of getting a single page.
  const recordMap = await api.databases.query({
    database_id: databaseId,
  })
  
  return recordMap
}
