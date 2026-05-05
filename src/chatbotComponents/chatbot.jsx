import { useState, useEffect, useRef } from "react";
import { chatBotController } from "./chatBotController";
import { Send, Bot, User } from "lucide-react";

// Assets Import
import LogoBP2TL from "../assets/icons/bp2tl.png";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "Halo Sobat BP2TL, Ada yang bisa aku bantu?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const result = await chatBotController({
  message: text,
});

    if (result.success) {
  const data = result.data;

  setMessages((prev) => [
    ...prev,
    {
      id: (Date.now() + 1).toString(),
      text: data.answer || data.response || "No response",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
} else {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Server error 😢 coba lagi ya",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSend(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <section className="fixed bottom-4 right-4 z-50">
        <div className="flex  gap-2">
          <button
            onClick={() => setOpen(!open)}
            className="fixed bottom-4 right-4 
  w-14 h-14 sm:w-16 sm:h-16 
  flex items-center justify-center 
  rounded-full bg-[#F1FF5E] hover:bg-gray-700 border"
            type="button"
          >
            <svg
              className="w-8 h-8 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="fixed bottom-6 right-24 z-50"></div>
        </div>

        <div
          className={`fixed 
    bottom-0 right-0 
    w-full h-full 
    sm:bottom-[calc(4rem+1.5rem)] sm:right-4 
    sm:w-[400px] sm:h-[600px] 
    bg-white rounded-none sm:rounded-lg border shadow 
    ${open ? "block" : "hidden"}
  `}
        >
          <div className="flex flex-col h-full">
            <div className="bg-[#1C0770] text-white p-4 flex items-center gap-2">
              <img src={LogoBP2TL} className="w-8 h-8" />
              <span className="font-medium">BP2TL Chatbot</span>

              {/* PUSH KE KANAN */}
              <div className="ml-auto">
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded hover:bg-white/20 transition"
                >
                  <svg
                    className="w-8 h-8 text-[#f1f1f1]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* CHAT CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";

                return (
                  <div key={msg.id} className="flex flex-col">
                    <div
                      className={`flex items-center gap-2 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`px-3 py-2 rounded-lg max-w-[70%] ${
                          isUser
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>

                      {isUser && (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* JAM */}
                    <span
                      className={`text-xs text-gray-400 mt-1 ${
                        isUser ? "text-right pr-10" : "text-left pl-10"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex flex-row gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce" />
                  <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]" />
                  <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Handle submit */}
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border rounded px-3 h-12 w-10"
                  placeholder="Tulis pertanyaan kamu"
                />

                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="m2.6 10.42 7.64 3.34 3.34 7.64c.16.37.52.6.92.6h.05a1 1 0 0 0 .9-.69l5.5-17c.12-.36.02-.75-.24-1.01a.98.98 0 0 0-1.01-.24L2.69 8.55c-.4.13-.67.49-.69.9-.02.42.22.8.6.97m15.85-4.86-4.09 12.63-2.44-5.59c-.1-.23-.28-.41-.52-.52L5.81 9.64l12.63-4.09Z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
