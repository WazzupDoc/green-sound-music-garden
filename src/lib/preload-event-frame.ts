/**
 * Decode an event photograph before switching the visible stage.
 * A rejected decode or a superseded selection must leave the last valid frame intact.
 * No network retry, prefetch queue, or automatic playback.
 */
export function preloadEventFrame(
  src: string,
  onReady: () => void,
  createImage: () => Pick<HTMLImageElement, "src" | "decode"> = () => new Image(),
): () => void {
  let cancelled = false;
  const image = createImage();
  image.src = src;
  void image.decode().then(() => {
    if (!cancelled) onReady();
  }).catch(() => {
    // Keep the last decoded photograph if the new one fails.
  });
  return () => { cancelled = true; };
}
