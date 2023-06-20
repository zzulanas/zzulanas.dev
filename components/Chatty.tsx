import { CreateChatCompletionResponse, CreateCompletionResponse } from "openai";
import React from "react";
// @ts-ignore
import { SSE } from "sse.js";
import Input from "./ui/Input";
import { CornerDownLeft, Frown, Loader, User, Wand } from "lucide-react";

export default function Chatty() {
  function promptDataReducer(
    state: any[],
    action: {
      index?: number;
      answer?: string | undefined;
      status?: string;
      query?: string | undefined;
      type?: "remove-last-item" | string;
    }
  ) {
    // set a standard state to use later
    let current = [...state];

    if (action.type) {
      switch (action.type) {
        case "remove-last-item":
          current.pop();
          return [...current];
        default:
          break;
      }
    }

    // check that an index is present
    if (action.index === undefined) return [...state];

    if (!current[action.index]) {
      current[action.index] = { query: "", answer: "", status: "" };
    }

    current[action.index].answer = action.answer;

    if (action.query) {
      current[action.index].query = action.query;
    }
    if (action.status) {
      current[action.index].status = action.status;
    }

    return [...current];
  }

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState<string>("");
  const [question, setQuestion] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<string | undefined>("");
  const eventSourceRef = React.useRef<SSE>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [promptIndex, setPromptIndex] = React.useState(0);
  const [promptData, dispatchPromptData] = React.useReducer(
    promptDataReducer,
    []
  );

  const cantHelp =
    answer?.trim() === "Sorry, I don't know how to help with that.";

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen(true);
      }

      if (e.key === "Escape") {
        console.log("esc");
        handleModalToggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function handleModalToggle() {
    setOpen(!open);
    setSearch("");
    setQuestion("");
    setAnswer(undefined);
    setPromptIndex(0);
    dispatchPromptData({ type: "remove-last-item" });
    setHasError(false);
    setIsLoading(false);
  }

  const handleConfirm = React.useCallback(
    async (query: string) => {
      setAnswer(undefined);
      setQuestion(query);
      setSearch("");
      dispatchPromptData({ index: promptIndex, answer: undefined, query });
      setHasError(false);
      setIsLoading(true);

      const eventSource = new SSE(
        `${
          process.env.NEXT_PUBLIC_SUPABASE_URL
        }/functions/v1/search-func?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      function handleError<T>(err: T) {
        setIsLoading(false);
        setHasError(true);
        console.error(err);
      }

      eventSource.addEventListener("error", handleError);
      eventSource.addEventListener("message", (e: any) => {
        try {
          setIsLoading(false);

          if (e.data === "[DONE]") {
            setPromptIndex((x) => {
              return x + 1;
            });
            return;
          }

          const completionResponse: any = JSON.parse(e.data);

          console.log(completionResponse);
          let text = completionResponse.choices[0].delta.content;
          if (text === undefined) {
            text = "";
          }

          setAnswer((answer) => {
            const currentAnswer = answer ?? "";

            dispatchPromptData({
              index: promptIndex,
              answer: currentAnswer + text,
            });

            return (answer ?? "") + text;
          });
        } catch (err) {
          handleError(err);
        }
      });

      eventSource.stream();

      eventSourceRef.current = eventSource;

      setIsLoading(true);
    },
    [promptIndex, promptData]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(search);

    handleConfirm(search);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4 text-slate-700">
          {question && (
            <div className="flex gap-4">
              <span className="bg-slate-100 dark:bg-slate-300 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                <User width={18} />{" "}
              </span>
              <p className="mt-0.5 font-semibold text-slate-700 dark:text-slate-100">
                {question}
              </p>
            </div>
          )}

          {isLoading && (
            <div className="animate-spin relative flex w-5 h-5 ml-2">
              <Loader />
            </div>
          )}

          {hasError && (
            <div className="flex items-center gap-4">
              <span className="bg-red-100 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                <Frown width={18} />
              </span>
              <span className="text-slate-700 dark:text-slate-100">
                Sad news, the search has failed! Please try again.
              </span>
            </div>
          )}

          {answer && !hasError ? (
            <div className="flex items-center gap-4 dark:text-white">
              <span className="bg-green-500 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                <Wand width={18} className="text-white" />
              </span>
              <h3 className="font-semibold">Answer:</h3>
              {answer}
            </div>
          ) : null}

          <div className="relative">
            <input
              placeholder="ask me a question about Zach..."
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="col-span-3"
            />
            <CornerDownLeft
              className={`absolute top-3 right-5 h-4 w-4 text-gray-300 transition-opacity ${
                search ? "opacity-100" : "opacity-0"
              }`}
            />
            <button type="submit" className="px-10 outline">
              Ask
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
