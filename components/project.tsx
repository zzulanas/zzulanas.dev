import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const Project: React.FC<{ project: ProjectProps }> = ({ project }) => {
  const { title, description, imageUrl, link } = project;

  return (
    <Link href={link} passHref className="p-4 md:w-1/2 md">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <Image
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={imageUrl}
          alt={title}
          width={544}
          height={306}
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
            {title}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {description}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default Project;
