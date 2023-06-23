"use client";

import { useChat } from "ai/react";
import cx from "classnames";
import { motion } from "framer-motion";
import { BrainCog, CornerUpRight, UserCircle2 } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import AnimatedText from "./AnimatedText";

const inputStyle = {
  backgroundColor: "transparent",
};

interface ChatProps {
  className?: string;
  dragEnabled?: boolean;
}

export default function Chatty(props: ChatProps) {
  const chatId = useId();

  const {
    messages,
    input,
    handleInputChange,
    append,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/search-func",
    body: {
      id: chatId,
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const templateQuestions = [
    "What does Zach do?",
    "Where does Zach live?",
    "What does Zach do for fun?",
    "How did Zach build this site?",
  ];

  return (
    <motion.div
      className={cx(
        "overflow-auto p-4 w-full h-full rounded-lg backdrop-blur-lg shadow-md bg-gradient-to-br from-orange-400 via-fuschia-400 to-emerald-400 cursor-pointer active:cursor-grabbing",
        props.className,
        isLoading ? "background-animate-thinking" : "background-animate-idle"
      )}
      drag={props.dragEnabled}
    >
      <motion.div className="bg-blue-steel-100 rounded-lg opacity-90 ">
        <div className="overflow-auto h-80 w-full flex flex-col justify-end p-4 bg-blue-steel-50 border border-gray-200 rounded-t-lg cursor-default">
          {messages.length === 0 &&
            templateQuestions.map((q, idx) => (
              <div className="text-grayscale-800 opacity-100" key={q + idx}>
                <motion.button
                  className="mb-2 flex flex-row items-start hover:bg-blue-steel-200 transition-all rounded-sm p-2"
                  onClick={() => append({ role: "user", content: q })}
                >
                  <div className="mr-1">
                    <CornerUpRight />
                  </div>
                  <AnimatedText title={q} />
                </motion.button>
              </div>
            ))}
          {messages.length >= 1 &&
            messages.map((m, idx) => (
              <div
                key={m.id}
                className={cx(
                  m.role === "user"
                    ? "text-grayscale-800"
                    : "text-blue-steel-500",
                  `opacity-${100 - idx * 10}`,
                  "mb-2 flex flex-row items-start"
                )}
              >
                <div className="inline-block mr-1 flex-none align-self-start">
                  {m.role === "user" ? (
                    <UserCircle2 size={32} strokeWidth={1.5} />
                  ) : (
                    <BrainCog size={32} strokeWidth={1.5} />
                  )}
                </div>
                <div>{m.content}</div>
              </div>
            ))}
        </div>

        <form onSubmit={handleSubmit} className="justify-start">
          <input
            value={input}
            placeholder={
              "ask me something about zach" +
              (messages.length === 0 ? " or choose a question above" : "")
            }
            onChange={handleInputChange}
            style={inputStyle}
            className="w-full h-10 px-4 mb-3 text-base placeholder-gray-600 text-gray-700 border-0 rounded-lg hover:text-black-700 focus:outline-none"
            disabled={isLoading}
            autoFocus
            ref={inputRef}
          />
        </form>
      </motion.div>
    </motion.div>
  );
}
