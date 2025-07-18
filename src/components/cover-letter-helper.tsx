"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateCoverLetter } from "@/ai/flows/cover-letter-flow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Wand2 } from "lucide-react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  role: z.string().min(2, "Role is required."),
});

type FormData = z.infer<typeof formSchema>;

export function CoverLetterHelper() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      role: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsGenerating(true);
    setResult("");
    try {
      const response = await generateCoverLetter(data);
      setResult(response.coverLetterIntro);
    } catch (error) {
      console.error(error);
      setResult("Sorry, I couldn't generate a cover letter intro right now.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-2xl">AI Cover Letter Helper</CardTitle>
        <CardDescription>
          Need a hand getting started? Let AI draft a cover letter intro for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Google" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate Intro
                </>
              )}
            </Button>
          </form>
        </Form>
        {(isGenerating || result) && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Generated Introduction:</h4>
            <Textarea
                readOnly
                value={result}
                placeholder={isGenerating ? "AI is thinking..." : ""}
                className="min-h-[120px] bg-secondary"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
