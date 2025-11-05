// src/lib/schema.ts
import { z } from 'zod';

export const contentGenerationSchema = z.object({
    contentType: z.string(),
    contentKeyword: z.string(),
    tags: z.array(z.string()),
    mainContent: z.string(),
});

// The crucial type we will use everywhere
export type ContentGenerationResponse = z.infer<typeof contentGenerationSchema>;