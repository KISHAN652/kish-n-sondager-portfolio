
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bot, X } from "lucide-react";
import { ResumeChat } from "./resume-chat";

export function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl transition-transform hover:scale-110"
        >
          {open ? <X className="size-8" /> : <Bot className="size-8" />}
          <span className="sr-only">Toggle Chatbot</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 border-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="size-5" />
            AI Resume Assistant
          </DialogTitle>
          <DialogDescription>
            Ask me anything about Kishan's skills and experience.
          </DialogDescription>
        </DialogHeader>
        <ResumeChat />
      </DialogContent>
    </Dialog>
  );
}
