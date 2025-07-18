
"use client";

import { useState, useRef, useEffect } from "react";
import { chatAboutResume } from "@/ai/flows/resume-chat-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Message = {
  id: number;
  role: "user" | "bot";
  content: string;
};

export function ResumeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
        scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatAboutResume({ question: input });
      const botMessage: Message = { id: Date.now() + 1, role: "bot", content: response.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error chatting with resume AI:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[60dvh] md:h-[28rem] flex flex-col">
      <ScrollArea className="flex-1 p-4 pr-2" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
              <div className="text-center text-muted-foreground animate-fade-in-up">
                Try asking: "What are your strongest skills?"
              </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 animate-fade-in-up",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "bot" && (
                <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/20"><Bot className="size-5 text-primary"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs sm:max-w-sm rounded-xl p-3 text-sm shadow-md",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                )}
              >
                {message.content}
              </div>
                {message.role === "user" && (
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-secondary"><User className="size-5"/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 animate-fade-in-up">
                <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/20"><Bot className="size-5 text-primary"/></AvatarFallback>
                </Avatar>
              <div className="bg-secondary rounded-xl p-3 shadow-md">
                <Loader2 className="size-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., What projects used Next.js?"
          className="flex-1"
          disabled={isLoading}
          autoComplete="off"
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="size-5" />
        </Button>
      </form>
    </div>
  );
}
