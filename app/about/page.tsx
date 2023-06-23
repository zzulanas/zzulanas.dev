import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-start">
      <div>
        <h1 className="text-8xl">hi</h1>
      </div>
      <p className="text-2xl">
        I&apos;m a software engineer based in NYC. I&apos;m currently working at{" "}
        <a
          href="https://www.vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:text-sky-700 transition duration-100"
        >
          NCBUniversal
        </a>{" "}
      </p>
    </div>
  );
}
