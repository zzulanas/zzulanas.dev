"use client";

import { useChat } from "ai/react";
import cx from "classnames";

const inputStyle = {
  backgroundColor: "transparent",
};

interface ChatProps {
  className?: string;
}

export default function Chatty(props: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/search-func",
  });

  return (
    <div className={cx("px-10 w-full h-full", props.className)}>
      <div className="overflow-auto h-80 w-full flex flex-col justify-end max-w-sm p-6 bg-blue-steel-50 border border-gray-200 rounded-lg shadow shadow-md">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cx(
              m.role === "user" ? "text-grayscale-800" : "text-grayscale-600"
            )}
          >
            {m.role}: {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="justify-start">
        <input
          value={input}
          placeholder="ask me something about zach..."
          onChange={handleInputChange}
          style={inputStyle}
          className="w-full h-10 mb-3 text-base placeholder-gray-600 text-gray-700 border-0 rounded-lg hover:text-black-700 focus:outline-none"
        />
      </form>
    </div>
  );
}
