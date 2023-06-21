"use client";
import Image from "next/image";
import cx from "classnames";
import { crimsonPro, martelSans, palanquinDark } from "./fonts";
import { motion } from "framer-motion";
import Chatty from "@/components/Chatty";

export default function Home() {
  return (
    <main>
      <motion.div className="flex flex-row justify-around  px-24">
        <div className="basis-1/3">
          <h1 className="text-8xl">Zach Zulanas</h1>
          <h2 className="text-3xl">big nerd</h2>
        </div>
        <div className="basis-2/3 flex items-end">
          <div className="mb-6">
            <Chatty />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
