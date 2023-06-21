"use client";

import { useChat } from "ai/react";
import cx from "classnames";

const inputStyle = {
  backgroundColor: "transparent",
};

export default function Chatty() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/search-func",
  });

  return (
    <div className="px-10">
      <div className="overflow-auto h-60 flex flex-col justify-end">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cx(
              m.role === "user" ? "text-gray" : "text-black",
              "mb-1 px-"
            )}
          >
            <div className="h-8 w-8 rounded-full ring-1 ring-black"></div>
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
