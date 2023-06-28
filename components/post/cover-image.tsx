import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { supabaseClient } from "@/lib/supabase-client";

type Props = {
  title: string;
  supabaseFile: string;
  slug?: string;
};

const CoverImage = ({ title, supabaseFile, slug }: Props) => {
  const { data: src } = supabaseClient.storage
    .from("blog-images")
    .getPublicUrl(supabaseFile);

  const image = (
    <Image
      src={src.publicUrl}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
