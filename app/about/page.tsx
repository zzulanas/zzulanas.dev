"use client";

import Image from "next/image";
import profilePic from "public/IMG_5891.jpg";
// TODO: figure out gradient import

export default function About() {
  return (
    <div className="flex flex-col justify-center items-start mx-2 md:mx-40">
      <div className="flex flex-row items-center justify-between">
        <div className="p-2 rounded-full backdrop-blur-lg shadow-md bg-gradient-to-br from-orange-400 via-fuschia-400 to-emerald-400">
          <Image
            src={profilePic}
            width={300}
            height={300}
            alt="Picture of Zach"
            className="rounded-full"
          />
        </div>
        <h1 className="text-6xl ml-20">hi I&apos;m Zach 👋</h1>
      </div>
      <p className="text-2xl pt-20">
        Thanks for visiting my website! Hopefully Chatty was able to answer some
        questions you had about me and my experience. if you didn&apos;t get a
        chance to speak with them, here&apos;s a little bit about me:
      </p>
      <ul className="list-disc pt-10 pl-5">
        <li className="text-2xl ">
          I&apos;m a software engineer at{" "}
          <a
            href="https://www.nbcuniversal.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-steel-600 hover:text-blue-steel-800 transition duration-100"
          >
            NBCUniversal 📺
          </a>
          , where I work on the Rights and Contracts engineering team.
        </li>
        <li className="text-2xl ">
          I live in Brooklyn, NY 🗽🚖 currently, but I&apos;m originally from
          the golden state of California 🌞
        </li>
        <li className="text-2xl ">
          I love to rock climb, take photos (check out my{" "}
          <a
            href="https://www.instagram.com/zachshotz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-steel-600 hover:text-blue-steel-800 transition duration-100"
          >
            Instagram
          </a>{" "}
          ), and work on side projects 📸
        </li>
      </ul>
      <div className="pt-10 text-xl">
        If you wanna know more about me or you&apos;d like to get in touch, feel
        free to reach out to me on{" "}
        <a
          href="https://www.linkedin.com/in/zzulanas/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-steel-600 hover:text-blue-steel-800 transition duration-100"
        >
          LinkedIn
        </a>{" "}
        or{" "}
        <a
          href="mailto:zzulanas@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-steel-600 hover:text-blue-steel-800 transition duration-100"
        >
          email
        </a>
      </div>
    </div>
  );
}
