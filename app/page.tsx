"use client";
import AnimatedText from "@/components/AnimatedText";
import Chatty from "@/components/Chatty";
import DraggableText from "@/components/DraggableText";
import { motion } from "framer-motion";
import { useRef } from "react";

// TODO: DARK MODE
export default function Home() {
  const name = "Zach Zulanas";
  const title = "software engineer";
  const hint = "(psst try dragging this text)";
  const dragEnabled = false;
  const constraintsRef = useRef(null);

  // TODO: look into Drag Controls, try and mimic gravity when hovering over title text
  return (
    <div
      className="flex flex-col md:flex-row justify-around items-center h-full"
      ref={constraintsRef}
    >
      <div className="basis-1/3 mb-10 md:mb-0 px-3 md:px-10">
        <h1 className="text-8xl">
          {!dragEnabled && <AnimatedText title={name} />}
          {dragEnabled && (
            <DraggableText
              text={name}
              parentRef={constraintsRef}
              dragEnabled={dragEnabled}
            />
          )}
        </h1>
        <h2 className="text-4xl">
          {!dragEnabled && <AnimatedText title={title} />}
          {dragEnabled && (
            <DraggableText
              text={title}
              parentRef={constraintsRef}
              dragEnabled={dragEnabled}
            />
          )}
        </h2>
        {dragEnabled && (
          <h2 className="text-2xl text-grayscale-300">
            <DraggableText
              text={hint}
              parentRef={constraintsRef}
              dragEnabled={dragEnabled}
            />
          </h2>
        )}
      </div>
      <div className="basis-2/3 flex items-stretch w-full h-full">
        <Chatty className="w-full h-full" dragEnabled={dragEnabled} />
      </div>
    </div>
  );
}
