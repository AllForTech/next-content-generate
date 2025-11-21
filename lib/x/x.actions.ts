import {
  Client,
  type ClientConfig,
  type Trends, // 🛑 Import the specific type for the trends response
} from '@xdevplatform/xdk';

// Configuration remains the same
const config: ClientConfig = { bearerToken: 'your-bearer-token' };
const client: Client = new Client(config);

// Step 1: Define the WOEID for the desired location (e.g., Worldwide)
const WORLDWIDE_WOEID = 1;

export async function getTrendingTopic() {
  try {
    //  Step 2: Use the client's 'trends' property to call the appropriate method
    // Method name is speculative, based on common SDK patterns (e.g., getByWoeid or getPlaceTrends)
    const trendsResponse: Trends.GetByWoeidResponse = await client.trends.getByWoeid(WORLDWIDE_WOEID);

    const trendsList = trendsResponse.data;

    if (!trendsList || trendsList.length === 0) {
      console.log("No trends found.");
      return null;
    }

    //  Step 3: Extract the highest-volume trend
    const topTrendName = trendsList;

    console.log(`Top Trend: ${topTrendName}`);

    // Return the name to be used as your dynamic prompt
    return topTrendName;

  } catch (error) {
    console.error("Error fetching X trends:", error);
    return null;
  }
}