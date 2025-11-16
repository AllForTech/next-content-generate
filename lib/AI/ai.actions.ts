export async function fileToBase64(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString('base64');
}