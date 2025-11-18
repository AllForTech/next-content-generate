// import { NextResponse } from 'next/server';
// import { fetchTrendingTopics } from '@/lib/trend-discovery';
// import { generateStructuredKeywords } from '@/lib/ai-services';
// import { generateAndSaveContent } from '@/lib/content-pipeline';
//
// // Define the expected structure of the structured output from the AI
// interface KeywordTopic {
//   topic: string;
//   keyword: string;
//   title: string;
// }
//
// export async function GET(request: Request) {
//  
//   // to ensure only your scheduled service can trigger this.
//   const secret = request.headers.get('Authorization');
//
//   // Replace 'MY_CRON_SECRET' with an actual environment variable
//   if (secret !== `Bearer ${process.env.CRON_JOB_SECRET}`) {
//     console.warn('Unauthorized access attempt to scheduled research route.');
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }
//
//   try {
//     // --- STEP 1: Trend Discovery ---
//     console.log('1. Fetching raw trending topics...');
//     const rawTrends = await fetchTrendingTopics();
//
//     if (!rawTrends || rawTrends.length === 0) {
//       return NextResponse.json({ message: 'No trends found to process.' }, { status: 200 });
//     }
//
//     // --- STEP 2: Keyword Selection & Structuring via AI ---
//     console.log('2. Asking AI to structure and select keywords...');
//     const structuredKeywords: KeywordTopic[] = await generateStructuredKeywords(rawTrends);
//
//     if (!structuredKeywords || structuredKeywords.length === 0) {
//       console.warn('AI failed to return structured keywords.');
//       return NextResponse.json({ message: 'AI failed to select keywords.' }, { status: 500 });
//     }
//
//     // --- STEP 3: Content Generation Loop ---
//     console.log(`3. Generating and saving content for ${structuredKeywords.length} topics...`);
//     const generationPromises = structuredKeywords.map(topicData =>
//       // This function should call your existing content generation logic
//       // and save the final result to the database (e.g., as a 'Scheduled_Draft').
//       generateAndSaveContent(topicData.topic, topicData.title)
//     );
//
//     const results = await Promise.all(generationPromises);
//
//     console.log(`Scheduled content generation complete. Successes: ${results.filter(r => r.success).length}`);
//
//     return NextResponse.json({
//       message: 'Scheduled content generation completed successfully.',
//       topicsGenerated: structuredKeywords.length
//     }, { status: 200 });
//
//   } catch (error) {
//     console.error('Scheduled research route failed:', error);
//     return NextResponse.json({ error: 'Internal Server Error during scheduled job.' }, { status: 500 });
//   }
// }