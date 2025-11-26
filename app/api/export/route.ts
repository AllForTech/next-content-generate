import { NextRequest, NextResponse } from 'next/server';
import markdownDocx, { Packer } from 'markdown-docx';

export const maxDuration = 56;
export const dynamic = 'force-dynamic';
export const NODE_OPTIONS = '--network-family-autoselection-attempt-timeout=5000';

export async function POST(req: NextRequest) {
  // 1. Get the Markdown text and filename from the request body
  const { markdown, filename = 'document' } = await req.json();

  if (!markdown) {
    return NextResponse.json({ error: 'Markdown content is required.' }, { status: 400 });
  }

  try {
    // 2. Convert Markdown to a DOCX document object
    const doc = await markdownDocx(markdown, {
      // Optional: Customize features like tables, images, etc.
      gfm: true, // Enable GitHub Flavored Markdown (for tables, etc.)
      // imageAdapter: ... handle image fetching if needed
    });

    // 3. Generate the DOCX file buffer (binary data)
    const buffer = await Packer.toBuffer(doc);

    // 4. Create the final response headers
    const headers = new Headers();
    headers.set(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    headers.set('Content-Disposition', `attachment; filename="${filename}.docx"`);
    headers.set('Content-Length', buffer.length.toString());

    // 5. Return the DOCX buffer as the response
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new NextResponse(buffer, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error('DOCX conversion failed:', error);
    return NextResponse.json(
      { error: 'Failed to convert document to DOCX format.' },
      { status: 500 },
    );
  }
}
