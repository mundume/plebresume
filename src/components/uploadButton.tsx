"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  CheckCircle2,
  FileText,
  Loader,
  Trash,
  UploadCloud,
  XCircle,
} from "lucide-react";
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
import { Progress } from "./ui/progress";

const UploadDropzone = () => {
  return (
    //<FileText />
    <div className=" text-zinc-800">
      <Dropzone>
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div className="flex flex-col gap-4 m-4 text-sm">
            <div
              {...getRootProps()}
              className="h-40 transition-all border border-gray-300 border-dashed rounded cursor-pointer hover:bg-slate-100/90 transit"
            >
              <Input {...getInputProps()} type="file" />
              <div className="flex flex-col items-center justify-center gap-2 py-6">
                <UploadCloud className="w-4 h-4 text-slate-700" />
                <h1 className="">
                  {/* <Loader className="w-5 h-5 text-slate-500 animate-spin" /> */}
                  Drag & drop or{" "}
                  <span className="text-slate-500">choose file</span> to upload
                </h1>
                <p className="text-xs font-medium text-slate-500">
                  .DOCX or .PDF
                </p>
              </div>
            </div>
            <div className="px-4 py-6 border rounded h-28">
              <div className="flex justify-between ">
                <div className="flex items-center flex-1 gap-2 ">
                  <FileText className="w-4 h-4 text-slate-700" />

                  <div className="w-full text-sm ">
                    <p className=" text-prowse">FileName.PDF</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      434KB{" "}
                      <Loader className="w-4 h-4 text-slate-700 animate-spin" />{" "}
                      Uploading...
                    </p>
                  </div>
                </div>

                <Trash className="w-4 h-4 cursor-pointer text-slate-700" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Progress value={33} />{" "}
                <span className="text-slate-500">33%</span>
              </div>
            </div>
            <div className="px-4 py-6 border rounded ">
              <div className="flex justify-between ">
                <div className="flex items-center flex-1 gap-2 ">
                  <FileText className="w-4 h-4 text-slate-700" />

                  <div className="w-full text-sm ">
                    <p className=" text-prowse">FileName.PDF</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      434KB{" "}
                      <span className="flex gap-1 text-green-500">
                        <CheckCircle2 className="w-4 h-4 " /> Completed
                      </span>
                    </p>
                  </div>
                </div>

                <Trash className="w-4 h-4 cursor-pointer text-slate-700" />
              </div>
            </div>
            <div className="px-4 py-6 border border-red-500 rounded ">
              <div className="flex justify-between ">
                <div className="flex items-center flex-1 gap-2 ">
                  <FileText className="w-4 h-4 text-slate-700" />

                  <div className="w-full text-sm ">
                    <p className=" text-prowse">FileName.PDF</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      434KB{" "}
                      <span className="flex gap-1 text-red-500">
                        <XCircle className="w-4 h-4 " /> Error
                      </span>
                    </p>
                  </div>
                </div>

                <Trash className="w-4 h-4 text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
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
