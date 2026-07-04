// Fetch a Google font's TTF/OTF bytes for use in next/og ImageResponse.
// Returns null on any failure so OG rendering degrades to the built-in font
// rather than throwing during the build.
export async function loadGoogleFont(
  family: string,
  text: string,
  weight = 400
): Promise<ArrayBuffer | null> {
  try {
    const url =
      `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}` +
      `:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (
      await fetch(url, {
        headers: {
          // Google serves woff2 to modern UAs; this UA gets a ttf src we can use.
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      })
    ).text();
    const src = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/);
    const fallback = css.match(/src:\s*url\(([^)]+)\)/);
    const fontUrl = (src ?? fallback)?.[1];
    if (!fontUrl) return null;
    const res = await fetch(fontUrl);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}
