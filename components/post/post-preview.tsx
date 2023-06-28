import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

const PostPreview = ({ title, coverImage, date, excerpt, slug }: Props) => {
  return (
    <Link as={`/blog/${slug}`} href="/blog/[slug]">
      <div className="bg-gradient-to-bl from-fuschia-200 to-emerald-200 rounded-md p-5 shadow-sm hover:shadow-lg transition-shadow">
        <h3 className="text-3xl mb-3 leading-snug">{title}</h3>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      </div>
    </Link>
  );
};

export default PostPreview;
