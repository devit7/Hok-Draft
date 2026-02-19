"use server";

import { TrakteerResponse, TrakteerSupport } from "@/types/trakteer";

export async function getTrakteerSupporters(): Promise<TrakteerSupport[]> {
  const API_KEY = process.env.TRAKTEER_API_KEY;

  if (!API_KEY) {
    console.error("TRAKTEER_API_KEY is not set");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.trakteer.id/v1/public/supports?limit=10`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          key: API_KEY,
          // Trakteer sometimes requires User-Agent
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 60 }, // Revalidate every minute
      },
    );

    if (!response.ok) {
      console.error(
        `Trakteer API Error: ${response.status} ${response.statusText}`,
      );
      const text = await response.text();
      console.error("Response body:", text);
      return [];
    }

    const data: TrakteerResponse = await response.json();

    if (data.status === "success") {
      return data.result.data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch Trakteer supporters:", error);
    return [];
  }
}
