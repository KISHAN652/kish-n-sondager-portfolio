
import { generateGreeting } from "@/ai/flows/dynamic-greeting";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Braces,
  Code,
  CodeXml,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Palette,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { FadeInSection } from "@/components/fade-in";
import { Skills } from "@/components/skills";
import { ContactForm } from "@/components/contact-form";
import { Typewriter } from "@/components/typewriter";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";


const projects = [
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio to showcase my skills and projects. Built with Next.js, Tailwind CSS, and TypeScript, featuring a clean, responsive design and AI-powered dynamic greetings.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "abstract design",
    tags: ["TypeScript", "Tailwind CSS"],
    codeUrl: "https://github.com/your-username/portfolio",
    demoUrl: "#",
  },
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce site with features like product catalog, shopping cart, user authentication, and a checkout process. The backend is powered by Python.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "online shopping",
    tags: ["JavaScript", "Python", "HTML/CSS", "API"],
    codeUrl: "https://github.com/your-username/ecommerce",
    demoUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "A simple and intuitive task management application to help users organize their daily tasks. Features include creating, editing, deleting, and marking tasks as complete.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "task list",
    tags: ["JavaScript", "HTML/CSS", "Local Storage"],
    codeUrl: "https://github.com/your-username/task-app",
    demoUrl: "#",
  },
];

export default async function Home() {
  const { greetings } = await generateGreeting({ name: "Visitor" });

  const navLinks = (
    <>
      <Link href="#skills" className="transition-colors hover:text-primary">
        Skills
      </Link>
      <Link href="#projects" className="transition-colors hover:text-primary">
        Projects
      </Link>
      <Link href="#education" className="transition-colors hover:text-primary">
        Education
      </Link>
      <Link href="#contact" className="transition-colors hover:text-primary">
        Contact
      </Link>
    </>
  );

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#home" className="text-xl font-bold font-display">
            Kishan Sondagar
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks}
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="border-b pb-4 flex flex-row justify-between items-center">
                  <SheetTitle>
                    <Link href="#home" className="text-xl font-bold font-display">
                      Kishan Sondagar
                    </Link>
                  </SheetTitle>
                   <ThemeToggle />
                  <SheetDescription className="sr-only">
                    Main navigation links for the portfolio.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <nav className="flex flex-col items-center gap-6 text-lg font-medium">
                     <Link href="#skills" className="transition-colors hover:text-primary">
                        Skills
                      </Link>
                      <Link href="#projects" className="transition-colors hover:text-primary">
                        Projects
                      </Link>
                      <Link href="#education" className="transition-colors hover:text-primary">
                        Education
                      </Link>
                      <Link href="#contact" className="transition-colors hover:text-primary">
                        Contact
                      </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <FadeInSection>
           <section
            id="home"
            className="relative overflow-hidden container mx-auto flex flex-col items-center justify-center space-y-8 px-4 py-16 text-center sm:py-20 md:py-24"
          >
             <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10 bg-[size:200%_200%] animate-background-pan"></div>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:text-left">
              <div className="space-y-6">
                <Typewriter greetings={greetings} />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-display">
                  <span className="text-primary animate-fade-in-blur">
                    Kishan
                  </span>
                  <span className="animate-fade-in-blur [animation-delay:200ms]">
                    {" "}
                    Sondagar
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:mx-0">
                  A passionate developer specializing in creating elegant and
                  efficient web solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                   <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/40 transition-all duration-300">
                    <Link href="#contact">
                      <Mail className="mr-2" />
                      Get in Touch
                    </Link>
                  </Button>
                  <div className="flex justify-center space-x-4 lg:justify-start">
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="https://github.com/your-username"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="https://linkedin.com/in/your-username"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative h-64 w-64 lg:h-96 lg:w-96 flex justify-center items-center justify-self-center">
                 <Avatar className="size-full">
                    <AvatarImage src="https://placehold.co/400x400.png" alt="Kishan Sondagar" data-ai-hint="man portrait" />
                    <AvatarFallback>KS</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-display">
                    My Skills
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    A snapshot of my technical abilities.
                  </p>
                </div>
              </div>
              <div className="mx-auto mt-12 max-w-4xl">
                <Skills />
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section
            id="projects"
            className="w-full py-12 md:py-24 lg:py-32 bg-secondary"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-display">
                    My Work
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Here are some of the projects I've worked on.
                  </p>
                </div>
              </div>
              <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="education" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto grid items-center justify-center gap-6 px-4 text-center md:px-6 lg:gap-10">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-display">
                  Education
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My academic background and qualifications, which serve as the foundation for my technical skills and passion for development.
                </p>
              </div>
              <div className="flex justify-center">
                <Card className="w-full max-w-md">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <GraduationCap className="size-8 text-primary" />
                    <CardTitle className="font-display text-base sm:text-lg">
                      Bachelor of computer application
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-left">
                    <p>
                      <strong>Graduation:</strong> May 2025
                    </p>
                    <p>
                      <strong>CGPA:</strong> 7.04
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </FadeInSection>
        
        <FadeInSection>
          <section id="hire-me" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-display">
                  Ready to Build Something Amazing?
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                  I'm currently available for freelance projects and open to discussing full-time opportunities. Let's connect and create something brilliant together.
                </p>
                <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/40 transition-all duration-300">
                  <a href="https://docs.google.com/uc?export=download&id=1UK0xNbMjUtCpnAV9BJLuEMn2I0HGLCyd" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2" />
                    Download CV
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section
            id="contact"
            className="w-full py-12 md:py-24 lg:py-32 border-t"
          >
            <div className="container mx-auto grid items-center justify-center gap-8 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight font-display">
                  Get In Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I'm always open to discussing new projects, creative ideas,
                  or opportunities to be part of an amazing team.
                </p>
              </div>
              <div className="w-full max-w-md mx-auto">
                <ContactForm />
              </div>
              <div className="flex justify-center space-x-4 mt-8">
                <Button asChild variant="outline" size="icon">
                  <a
                    href="https://github.com/your-username"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <a
                    href="https://linkedin.com/in/your-username"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>

      <footer className="w-full py-6 px-4 md:px-6 border-t">
        <div className="container mx-auto flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Kishan Sondagar. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
