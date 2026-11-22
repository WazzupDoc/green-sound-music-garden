/**
 * Decode an event photograph before switching the visible stage.
 * A rejected decode or a superseded selection must leave the last valid frame intact.
 * No network retry, prefetch queue, or automatic playback.
 */
export function preloadEventFrame(
  src: string,
  onReady: () => void,
  createImage: () => Pick<HTMLImageElement, "src" | "decode"> = () => new Image(),
  onError?: () => void,
): () => void {
  let cancelled = false;
  const fail = () => { if (!cancelled) onError?.(); };
  // Empty/whitespace URLs can resolve against the document itself in image.src.
  // Reject them without creating a request or replacing the verified frame.
  const normalizedSrc = src.trim();
  // Keep event photography on ordinary relative or HTTP(S) URLs; reject
  // opaque/active schemes and protocol-relative remote hosts without an image request.
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(normalizedSrc)?.[1]?.toLowerCase();
  if (!normalizedSrc || /^[\\/]{2}/.test(normalizedSrc) || (scheme !== undefined && scheme !== "http" && scheme !== "https")) {
    fail();
    return () => { cancelled = true; };
  }
  try {
    const image = createImage();
    image.src = normalizedSrc;
    // Promise.resolve also handles a thenable or a non-Promise decode implementation.
    void Promise.resolve(image.decode()).then(() => {
      if (!cancelled) onReady();
    }, fail);
  } catch {
    // Browser/image mocks may throw synchronously when assigning src or decoding.
    // Report the same recoverable failure rather than crashing the Events route.
    fail();
  }
  return () => { cancelled = true; };
}
