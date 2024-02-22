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

const FormDrawerMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = () => setIsOpen((open) => !open);
  return (
    <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className="px-4">
        <ApplicationForm handleSubmit={handleSubmit} />
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawerMobile;
