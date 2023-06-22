"use client";

import { useChat } from "ai/react";
import cx from "classnames";
import { BrainCog, UserCircle2 } from "lucide-react";

const inputStyle = {
  backgroundColor: "transparent",
};

interface ChatProps {
  className?: string;
}

export default function Chatty(props: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/search-func",
    });

  return (
    <div
      className={cx(
        "overflow-auto p-4 w-full h-full rounded-lg bg-blue-steel-200 shadow-md",
        props.className,
        isLoading &&
          "bg-gradient-to-br from pink-300 to to-blue-steel-300 background-animate"
      )}
    >
      <div className="bg-blue-steel-100 rounded-lg">
        <div className="overflow-auto h-80 w-full flex flex-col justify-end p-4 bg-blue-steel-50 border border-gray-200 rounded-t-lg">
          {messages.map((m, idx) => (
            <div
              key={m.id}
              className={cx(
                m.role === "user"
                  ? "text-grayscale-800"
                  : "text-blue-steel-500",
                `opacity-${100 - idx * 10}`,
                "mb-2 flex flex-row items-center"
              )}
            >
              {m.role === "user" ? (
                <UserCircle2
                  size={32}
                  strokeWidth={1.5}
                  className="inline-block mr-1"
                />
              ) : (
                <BrainCog
                  size={32}
                  strokeWidth={1.5}
                  className="inline-block mr-1"
                />
              )}
              {m.role === "user" ? "User" : "AI"}: {m.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="justify-start">
          <input
            value={input}
            placeholder="ask me something about zach..."
            onChange={handleInputChange}
            style={inputStyle}
            className="w-full h-10 px-4 mb-3 text-base placeholder-gray-600 text-gray-700 border-0 rounded-lg hover:text-black-700 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
