"use client";
import Chatty from "@/components/Chatty";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="h-full">
      <motion.div className="flex flex-row justify-around h-full px-24">
        <div className="basis-1/3">
          <h1 className="text-8xl">Zach Zulanas</h1>
          <h2 className="text-3xl">big nerd</h2>
        </div>
        <div className="basis-2/3 flex items-stretch">
          <Chatty className="w-full h-full" />
        </div>
      </motion.div>
    </main>
  );
}
