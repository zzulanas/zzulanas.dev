"use client";

import { useChat } from "ai/react";

export default function Chatty() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/search-func",
  });

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="ask me something about zach..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
