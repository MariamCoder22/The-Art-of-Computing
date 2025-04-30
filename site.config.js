// Define the notionConfig object structure directly in JavaScript

const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Mariam Khayr",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Software & Hardware Engineer",
    bio: "Passionate about coding, circuits, and everything in between.",
    email: "mariamkhayr8@gmail.com",
    linkedin: "Mariam Khayr",
    github: "MariamCoder22",
  },
  projects: [
    {
      name: "Mariam Khayr",
      href: "https://github.com/MariamCoder22",
    },
  ],
  // blog setting (required)
  blog: {
    title: "The Art of Computing",
    description: "Welcome to The Art of Computing",
    scheme: "dark", // 'light' | 'dark' | 'system'
  },

  // CONFIG configuration (required)
  link: "https://morethan-log.vercel.app",
  since: 2025, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  notionConfig: {
    databaseId: "YOUR_DATABASE_ID",  // Replace with your actual Notion database ID
    apiKey: "YOUR_API_KEY",  // Replace with your actual Notion API key
  },

  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },

  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
};

// Export CONFIG so it can be accessed elsewhere in the app
module.exports = { CONFIG };

