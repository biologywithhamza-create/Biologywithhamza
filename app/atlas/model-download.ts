// Based on ashemag/human-atlas (MIT); gzip fallback added for this integration.
export async function decodeModelResponse(response: Response, expectedBytes: number, compressed: boolean): Promise<ArrayBuffer> {
  if (!response.ok) throw new Error("An anatomy file could not be loaded. Check your connection and try again.");
  const payload = await response.arrayBuffer();
  const signature = new Uint8Array(payload, 0, Math.min(2, payload.byteLength));
  let buffer = payload;
  if (compressed && signature[0] === 0x1f && signature[1] === 0x8b) {
    if (typeof DecompressionStream !== "undefined") buffer = await new Response(new Blob([payload]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
    else { const { gunzipSync } = await import("fflate"); const data = gunzipSync(new Uint8Array(payload)); buffer = new Uint8Array(data).buffer; }
  }
  if (buffer.byteLength !== expectedBytes) throw new Error("An anatomy file was incomplete. Please reload the atlas.");
  return buffer;
}
