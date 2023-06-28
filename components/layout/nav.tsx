"use client";

import Link from "next/link";
import { LayoutGroup, motion, useAnimation } from "framer-motion";
import { riseWithFade, staggerChildren } from "@/utils/animations";
import AnimatedText from "../AnimatedText";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// TODO: figure out how to get staggered animation for zzulanas.dev and rest of nav

export default function Nav() {
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  const path01Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: "M0 9.5L24 9.5" },
  };

  const path02Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    moving: { d: "M0 14.5L24 14.5" },
    closed: { d: "M0 14.5L15 14.5" },
  };
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const isAboutSelected = pathname === "/about";
  const isProjectsSelected = pathname === "/projects";
  const isBlogSelected = pathname === "/blog";

  const onButtonClick = async () => {
    // change the internal state
    setOpen(!isOpen);

    // start animation
    if (!isOpen) {
      await path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
    } else {
      path01Controls.start(path01Variants.closed);
      await path02Controls.start(path02Variants.moving);
      path02Controls.start(path02Variants.closed);
    }
  };
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
          <div className="md:hidden">
            <button onClick={onButtonClick}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <motion.path
                  {...path01Variants.closed}
                  animate={path01Controls}
                  transition={{ duration: 0.2 }}
                  stroke="#000"
                />
                <motion.path
                  {...path02Variants.closed}
                  animate={path02Controls}
                  transition={{ duration: 0.2 }}
                  stroke="#000"
                />
              </svg>
            </button>
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
              onClick={onButtonClick}
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
              onClick={onButtonClick}
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
              onClick={onButtonClick}
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
