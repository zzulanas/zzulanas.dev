"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { riseWithFade, staggerChildren } from "@/utils/animations";
import AnimatedText from "../AnimatedText";
import { usePathname } from "next/navigation";

// TODO: figure out how to get staggered animation for zzulanas.dev and rest of nav

export default function Nav() {
  const pathname = usePathname();
  console.log(pathname);
  const isAboutSelected = pathname === "/about";
  const isProjectsSelected = pathname === "/projects";
  const isBlogSelected = pathname === "/blog";
  return (
    <div className={"fixed top-0 w-full bg-white/0 z-30 transition-all"}>
      <motion.div className="mx-10 my-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
        <Link href="/" className="flex items-center font-display">
          <AnimatedText title="/zzulanas.dev" className="text-5xl" />
        </Link>
        <motion.div
          className="mx-5 flex flex-row gap-4"
          variants={staggerChildren}
        >
          <Link
            href="/about"
            className="group text-sky-600 transition duration-100"
          >
            <AnimatedText
              title="about"
              className={
                "text-2xl link link-underline link-underline-black text-black " +
                (isAboutSelected ? "selected-tab" : "")
              }
            />
          </Link>
          <Link
            href="/projects"
            className="group text-sky-600 transition duration-100"
          >
            <AnimatedText
              title="projects"
              className={
                "text-2xl link link-underline link-underline-black text-black " +
                (isProjectsSelected ? "selected-tab" : "")
              }
            />
          </Link>
          <Link
            href="/blog"
            className="group text-sky-600 transition duration-100"
          >
            <AnimatedText
              title="blog"
              className={
                "text-2xl link link-underline link-underline-black text-black " +
                (isBlogSelected ? "selected-tab" : "")
              }
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
