import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-row md:justify-between justify-center h-auto mb-10">
      <div className="flex flex-row justify-center items-center px-20">
        <a
          href="https://github.com/zzulanas/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-700 transition duration-100"
        >
          <span className="sr-only">GitHub</span>
          <Github size={32} strokeWidth={1.5} />
        </a>
        <a
          href="https://twitter.com/zzulanas"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-6 text-gray-500 hover:text-gray-700 transition duration-100"
        >
          <span className="sr-only">Twitter</span>
          <Twitter size={32} strokeWidth={1.5} />
        </a>
        <a
          href="https://www.linkedin.com/in/zzulanas/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-6 text-gray-500 hover:text-gray-700 transition duration-100"
        >
          <span className="sr-only">LinkedIn</span>
          <Linkedin size={32} strokeWidth={1.5} />
        </a>
      </div>
    </footer>
  );
}
