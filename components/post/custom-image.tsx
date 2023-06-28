import { supabaseClient } from "@/lib/supabase-client";
import Image from "next/image";

type Props = {
  supabaseFile: string;
  alt: string;
  priority?: string;
};

export default function CustomImage({ supabaseFile, alt, priority }: Props) {
  const prty = priority ? true : false;

  const { data: src } = supabaseClient.storage
    .from("blog-images")
    .getPublicUrl(supabaseFile);

  return (
    <div className="w-full h-full">
      <Image
        className="rounded-lg mx-auto"
        src={src.publicUrl}
        alt={alt}
        width={650}
        height={650}
        priority={prty}
      />
      <a href={src.publicUrl} target="_blank" rel="noopener noreferrer">
        <p className="text-center text-sm text-gray-500">{alt}</p>
      </a>
    </div>
  );
}
