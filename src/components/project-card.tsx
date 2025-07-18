"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  codeUrl: string;
  demoUrl: string;
};

export function ProjectCard({
  title,
  description,
  imageUrl,
  imageHint,
  tags,
  codeUrl,
  demoUrl,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
      <CardHeader>
        <div className="aspect-video relative mb-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint={imageHint}
          />
        </div>
        <CardTitle className="font-display">{title}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-start gap-4">
        <Button asChild variant="outline">
          <Link href={codeUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 size-4" /> Code
          </Link>
        </Button>
        <Button asChild>
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 size-4" /> Live Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
