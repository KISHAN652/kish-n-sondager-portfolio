"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Braces, Code, CodeXml, Palette } from "lucide-react";

type Skill = {
  name: string;
  icon: React.ReactNode;
  level: number;
};

const skills: Skill[] = [
  { name: "HTML", icon: <CodeXml className="size-8" />, level: 95 },
  { name: "CSS", icon: <Palette className="size-8" />, level: 90 },
  { name: "JavaScript", icon: <Braces className="size-8" />, level: 85 },
  { name: "Python", icon: <Code className="size-8" />, level: 80 },
];

export function Skills() {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div ref={domRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="flex items-center gap-4 group"
        >
          <div className="flex size-16 items-center justify-center rounded-full border bg-card shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/20">
            {skill.icon}
          </div>
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <Progress
              value={isVisible ? skill.level : 0}
              className="h-3 transition-all duration-1000 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
