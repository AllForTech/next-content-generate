import {
  pgTable,
  uuid,
  timestamp,
  text,
  jsonb,
  unique
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- Global Constants ---
// Use a standard prefix for all table names
const tablePrefix = 'ai_';

// --- 1. Contents Table (Master Content Records) ---
// This table acts as a master list or directory for generated content.
// author_id is a foreign key, likely linking to a 'users' table (implied by Supabase Auth).
export const contents = pgTable(`contents`, {
  // content_id: Primary key, UUID is standard for Supabase
  contentId: text('content_id').primaryKey(),

  // author_id: Foreign key linking to the user who created the content
  authorId: text('author_id').primaryKey().notNull(),

  // created_at: Automatically tracks when the master record was first created
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

// Relations for 'contents'
// This establishes a one-to-many relationship: one master 'contents' record can have many 'user_contents' versions.
export const contentsRelations = relations(contents, ({ many }) => ({
  versions: many(userContents),
}));


// --- 2. User Contents Table (Content Versions/History) ---
// This table holds the actual large data blobs, prompts, and specific versions of the content.
export const userContents = pgTable(`user_contents`, {
  // Primary Key for the version record itself
  sessionId: text('session_id').primaryKey(),

  // content_id: Foreign key linking back to the 'contents' master record
  contentId: uuid('content_id')
    .notNull()
    .references(() => contents.contentId, { onDelete: 'cascade' }).primaryKey(), // Cascade deletion ensures versions are cleaned up

  // author_id: User who created this specific version (should match contents.authorId)
  authorId: uuid('author_id').notNull().primaryKey(),

  // created_at: Timestamp for when this specific version/session was created
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),

  // The final generated content (text/markdown)
  content: text('content').notNull(),

  // The prompt used to generate this content
  prompt: text('prompt'),

  // Flexible storage for various complex data types (JSON objects/arrays)
  attachedFile: jsonb('attached_file'),
  scrapedData: jsonb('scraped_data'),
  searchResults: jsonb('search_results'),
  images: jsonb('images'),
}, (t) => ({
  // Optional: Ensure session_id and content_id together are unique (though session_id is already PK)
  unq: unique().on(t.sessionId, t.contentId),
}));

// Relations for 'userContents'
export const userContentsRelations = relations(userContents, ({ one }) => ({
  // This defines the 'one' master content record this version belongs to
  masterContent: one(contents, {
    fields: [userContents.contentId],
    references: [contents.contentId],
  }),
}));
