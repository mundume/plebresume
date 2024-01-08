"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Upload, UploadCloud } from "lucide-react";
import Dropzone from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";

const UploadDropzone = () => {
  return (
    <>
      <Dropzone>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="h-32 m-4 border border-gray-300 rounded"
          >
            <Input {...getInputProps()} type="file" />
            <div className="flex flex-col items-center justify-center gap-2 py-6 text-slate-900">
              <UploadCloud className="w-5 h-5 text-slate-500" />
              <h1 className="">
                Drag & drop or{" "}
                <span className="text-slate-500">choose file</span> to upload
              </h1>
              <p className="text-sm text-slate-500">.DOCX or .PDF</p>
            </div>
          </div>
        )}
      </Dropzone>
    </>
  );
};

const UploadButton = () => {
  const [isopen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={isopen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <UploadCloud className="w-4 h-4 mr-2" /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
