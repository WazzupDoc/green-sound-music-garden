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
  try {
    const image = createImage();
    image.src = src;
    // Promise.resolve also handles a thenable or a non-Promise decode implementation.
    void Promise.resolve(image.decode()).then(() => {
      if (!cancelled) onReady();
    }).catch(fail);
  } catch {
    // Browser/image mocks may throw synchronously when assigning src or decoding.
    // Report the same recoverable failure rather than crashing the Events route.
    fail();
  }
  return () => { cancelled = true; };
}
