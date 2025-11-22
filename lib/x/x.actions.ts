import {
  Client,
  type ClientConfig,
  type Trends,
} from '@xdevplatform/xdk';

const BEARER_TOKEN = process.env.X_BEARER_TOKEN!;
const client: Client = new Client({
  bearerToken: BEARER_TOKEN,

});

const WORLDWIDE_WOEID = 1;

export async function getTrendingTopic() {
  try {
    // 1. Fetch the trends response
    const trendsResponse: Trends.GetByWoeidResponse = await client.trends.getPersonalized();

    // 2. The data structure is typically [{ trends: [{ name: 'topic', tweet_volume: 123 }, ...], ... }]
    const trendsListContainer = trendsResponse.data;

    console.log("Trends list", trendsListContainer);

    if (!trendsListContainer || trendsListContainer.length === 0 ) {
      console.log("No trends or improperly formatted response found.");
      return null;
    }

    // Drill down to the actual array of trending topics
    const trendsArray = trendsListContainer[0].trends;

    if (trendsArray.length === 0) {
      console.log("Trends list is empty.");
      return null;
    }

    // 3. Extract the highest-volume trend
    const topTrend = trendsArray[0];

    const topTrendName = topTrend.name;

    console.log(`Top Trend: ${topTrendName}`);

    return topTrendName;

  } catch (error) {
    console.error("Error fetching X trends:", error);
    return null;
  }
}