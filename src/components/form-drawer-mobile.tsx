import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import ApplicationForm from "./application-form";
import { useCoverLetterContext } from "./Provider";
import { Bot, Loader, Pencil } from "lucide-react";

const FormDrawerMobile = () => {
  const { response, isLoading } = useCoverLetterContext();
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = () => setIsOpen((open) => !open);
  return (
    <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DrawerTrigger asChild>
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
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <ApplicationForm handleSubmit={handleSubmit} />
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawerMobile;
