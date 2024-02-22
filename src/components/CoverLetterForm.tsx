import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Bot, Loader, Pencil } from "lucide-react";
import { useResumeContext } from "./Provider";
import ApplicationForm from "./application-form";

const CoverLetterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = () => setIsOpen((open) => !open);

  const { isLoading, response } = useResumeContext();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          variant={response ? "outline" : "default"}
          size={response ? "icon" : "default"}
        >
          {response ? (
            <>
              <Pencil className="w-4 h-4 hover:shadow-2xl text-slate-600" />{" "}
            </>
          ) : (
            <>
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 text-purple-500 animate-spin" />
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 mr-1.5 hover:shadow-2xl text-purple-500" />
                  play
                </>
              )}
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-md max-h-[90vh]">
        <ApplicationForm handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CoverLetterForm;
