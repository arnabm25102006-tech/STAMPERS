import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://stampers-2zaz.vercel.app",
      lastModified: new Date(),
    },
  ];
}