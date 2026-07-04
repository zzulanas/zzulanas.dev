const BLOG_IMAGE_BASE =
  "https://qgxvhncvypeqowyohhys.supabase.co/storage/v1/object/public/blog-images";

function CustomImage({
  supabaseFile,
  alt,
}: {
  supabaseFile: string;
  alt: string;
  priority?: string;
}) {
  const src = `${BLOG_IMAGE_BASE}/${supabaseFile}`;
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mx-auto rounded-xl" />
      <figcaption className="text-center">{alt}</figcaption>
    </figure>
  );
}

export const mdxComponents = {
  CustomImage,
};
