"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function MarkdownEditor(...props) {
  const [markdown, setMarkdown] = useState(
    "# Hello, Markdown!\n\nThis is a live preview."
  );

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Textarea
              {...props}
              placeholder="Type your Markdown here..."
              className="min-h-[300px] font-mono"
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="prose dark:prose-invert max-w-none min-h-[300px] p-4 border rounded-md">
              <ReactMarkdown>{}</ReactMarkdown>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
