"use client";

import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import { riseWithFade, staggerChildren } from "@/utils/animations";
import AnimatedText from "../AnimatedText";
import { usePathname } from "next/navigation";
import MenuButton from "../ui/MenuButton";
import { useState } from "react";

// TODO: figure out how to get staggered animation for zzulanas.dev and rest of nav

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const isAboutSelected = pathname === "/about";
  const isProjectsSelected = pathname === "/projects";
  const isBlogSelected = pathname === "/blog";
  return (
    <LayoutGroup>
      <div
        className={
          "fixed top-0 w-full bg-white z-30 transition-all border-b-2 shadow"
        }
      >
        <motion.div className="md:mx-10 mx-4 my-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto ">
          <Link href="/" className="flex items-center font-display">
            <AnimatedText
              title="/zzulanas.dev"
              className="md:text-5xl text-3xl"
            />
          </Link>
          <motion.div
            className="mx-5 flex md:flex-row flex-col gap-4 md:visible invisible"
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
          <div className="md:hidden" onClick={() => setOpen(!isOpen)}>
            <MenuButton />
          </div>
        </motion.div>
        {isOpen && (
          <motion.div
            className="mx-5 flex md:flex-row flex-col gap-4 pb-4"
            variants={staggerChildren}
          >
            <Link
              href="/about"
              className="group text-sky-600 transition duration-100"
              onClick={() => setOpen(!isOpen)}
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
              onClick={() => setOpen(!isOpen)}
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
              onClick={() => setOpen(!isOpen)}
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
        )}
      </div>
    </LayoutGroup>
  );
}
