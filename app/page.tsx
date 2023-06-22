"use client";
import Chatty from "@/components/Chatty";
import DraggableText from "@/components/DraggableText";
import { motion } from "framer-motion";
import { useRef } from "react";

// TODO: DARK MODE
export default function Home() {
  const name = "Zach";
  const title = "big nerd";

  const constraintsRef = useRef(null);
  return (
    <div
      className="flex flex-row justify-around h-full px-10"
      ref={constraintsRef}
    >
      <div className="basis-1/3">
        <h1 className="text-8xl">
          <DraggableText text={name} parentRef={constraintsRef} />
          <DraggableText text="Zulanas" parentRef={constraintsRef} />
        </h1>
        <motion.h2 className="text-3xl">big nerd</motion.h2>
      </div>
      <div className="basis-2/3 flex items-stretch">
        <Chatty className="w-full h-full" />
      </div>
    </div>
  );
}
