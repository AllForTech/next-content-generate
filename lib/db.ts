import Dexie, { Table } from 'dexie';
import { ContentGenerationResponse } from '@/lib/schema'; // Import your structured content type

// --- 1. Define the Interface for Stored Data ---
// We extend the AI response type to include necessary IDs and metadata for storage.
export interface StoredContent extends ContentGenerationResponse {
  id?: number; // IndexedDB uses auto-incrementing number IDs by default
  createdAt: Date;
  prompt: string;
}

// --- 2. Define the Database Interface ---
export class ContentDB extends Dexie {
  // Declare the tables in your database
  content: Table<StoredContent, number>;

  constructor() {
    // 1. Initialize the database name
    super('AICreatorDatabase');

    // 2. Define the schema versions
    // The version number MUST be an integer (e.g., 1, 2, 3...)
    this.version(1).stores({
      // 'content' is the table name.
      // '++id' means the 'id' field is auto-incrementing and the primary key.
      // ',createdAt,contentType' means 'createdAt' and 'contentType' are indexed for fast lookups.
      content: '++id, createdAt, contentType',
    });

    // 3. Map the tables to their TypeScript interfaces
    this.content = this.table('content');
  }
}

// --- 3. Export the Database Instance ---
export const db = new ContentDB();
