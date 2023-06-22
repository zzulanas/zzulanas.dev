"use client";
import Chatty from "@/components/Chatty";
import DraggableText from "@/components/DraggableText";
import { motion } from "framer-motion";
import { useRef } from "react";

// TODO: DARK MODE
export default function Home() {
  const name = "Zach Zulanas";
  const title = "big nerd";

  const constraintsRef = useRef(null);
  // TODO: look into Drag Controls, try and mimic gravity when hovering over title text
  return (
    <div
      className="flex flex-col md:flex-row justify-around items-center h-full px-10"
      ref={constraintsRef}
    >
      <div className="basis-1/3">
        <h1 className="text-8xl">
          <DraggableText text={name} parentRef={constraintsRef} />
        </h1>
        <h2 className="text-4xl">
          <DraggableText text={title} parentRef={constraintsRef} />
        </h2>
      </div>
      <div className="basis-2/3 flex items-stretch">
        <Chatty className="w-full h-full" />
      </div>
    </div>
  );
}
