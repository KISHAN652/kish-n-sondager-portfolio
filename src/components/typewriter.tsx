
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type TypewriterProps = {
  greetings: string[];
  className?: string;
};

export function Typewriter({ greetings, className }: TypewriterProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delay = 2000;

  useEffect(() => {
    // Ensure greetings is not empty and is an array
    if (!greetings || greetings.length === 0) return;

    const handleTyping = () => {
      const i = loopNum % greetings.length;
      const fullText = greetings[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingTimeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, loopNum, greetings, delay, deletingSpeed, typingSpeed]);

  return (
    <div className={cn("text-lg sm:text-xl md:text-2xl font-semibold text-muted-foreground min-h-[40px]", className)}>
      <span>{text}</span>
      <span className="animate-pulse">|</span>
    </div>
  );
}
