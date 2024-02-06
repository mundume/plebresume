import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

const AddCoverLetterInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Bot className="w-4 h-4 mr-1.5 hover:shadow-2xl text-yellow-400" />
          Generate Cover letter
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoverLetterInfo;
