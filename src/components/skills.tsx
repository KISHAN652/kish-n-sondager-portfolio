"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  icon: React.ReactNode;
  level: number;
};

export function Skills({ skills }: { skills: Skill[] }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
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
