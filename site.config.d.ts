// site.config.d.ts

export interface Profile {
    name: string
    image: string
    role: string
    bio: string
    email: string
    linkedin: string
    github: string
  }
  
  export interface SiteConfig {
    profile: Profile
    // You can extend this with other config sections if needed:
    // blog, projects, notionConfig, etc.
  }
  
  declare module "site.config" {
    export const CONFIG: SiteConfig
  }
  