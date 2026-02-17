import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.hok-draft.web.id";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/honor-of-kings/custom-tier-maker`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/honor-of-kings/custom-counter-pick-maker`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
        {
      url: `${baseUrl}/honor-of-kings`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/honor-of-kings/draft-pick`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Add other static routes here if needed
  ];
}
