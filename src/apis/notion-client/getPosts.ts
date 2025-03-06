import { Client } from "@notionhq/client"
import { CONFIG } from "site.config"
import { idToUuid } from "notion-utils"
import { TPosts, TPost } from "src/types"

/**
 * Fetches all posts from Notion database
 */
export const getPosts = async (): Promise<TPosts> => {
  const databaseId = CONFIG.notionConfig.databaseId as string
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  try {
    // Query the Notion database
    const response = await notion.databases.query({
      database_id: databaseId,
    })

    // Extract blog posts from Notion response
    const data: TPosts = response.results.map((page: any): TPost => {
      return {
        id: page.id,
        title: page.properties.Name?.title?.[0]?.plain_text || "Untitled", // Adjust property name if needed
        slug: page.properties.Slug?.rich_text?.[0]?.plain_text || "", // Ensure "Slug" exists in Notion
        date: page.properties.Date?.date?.start || new Date().toISOString(),
        createdTime: new Date(page.created_time).toISOString(),
        fullWidth: false, // No equivalent property in Notion v2
        type: page.properties.Type?.select?.name || "Post", // Adjust property name if needed
        status: page.properties.Status?.select?.name || "Published", // Adjust property name if needed
      }
    })

    // Sort posts by date (newest first)
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return data
  } catch (error) {
    console.error("Error fetching Notion database:", error)
    return []
  }
}

