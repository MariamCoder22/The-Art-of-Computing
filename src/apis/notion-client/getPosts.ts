import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils" 
import getAllDatabaseIds from "src/libs/utils/notion/getAllDatabaseIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

export const getPosts = async () => {
  let id = CONFIG.notionConfig.databaseId as string
  const api = new NotionAPI()

  // The correct method is getPage, not getDatabase
  const response = await api.getPage(id)
  id = idToUuid(id)
  
  // Check if collection_data exists
  const collectionData = Object.values(response.collection || {})
  if (!collectionData || collectionData.length === 0) {
    console.error("No collection data found")
    return []
  }
  
  const collection = collectionData[0]?.value
  const block = response.block || {}
  const schema = collection?.schema

  const rawMetadata = block[id]?.value

  // Check Type
  if (
    !rawMetadata ||
    (rawMetadata.type !== "collection_view_page" &&
    rawMetadata.type !== "collection_view")
  ) {
    console.error("Invalid database type or no metadata found")
    return []
  } else {
    // Construct Data
    const pageIds = getAllDatabaseIds(response)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const pageId = pageIds[i]
      const properties = (await getPageProperties(pageId, block, schema)) || null
      
      if (properties && block[pageId]?.value) {
        // Add fullwidth, createdtime to properties
        properties.createdTime = new Date(
          block[pageId].value?.created_time
        ).toString()
        properties.fullWidth =
          (block[pageId].value?.format as any)?.page_full_width ?? false

        data.push(properties)
      }
    }

    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })

    const posts = data as TPosts
    return posts
  }
}