"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  CheckCircle2,
  FileText,
  Loader,
  Trash,
  Upload,
  UploadCloud,
  XCircle,
} from "lucide-react";
import Dropzone from "react-dropzone";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const UploadDropzone = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      setIsUploading(false);
      router.push(`/coverletter/${file?.id}`);
    },
    retry: true,
    retryDelay: 500,
  });
  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    return interval;
  };
  return (
    <div className=" text-zinc-800">
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFile) => {
          setIsUploading(true);
          const progressInterval = startSimulatedProgress();

          //handle file upload

          const res = await startUpload(acceptedFile);
          if (!res) {
            setIsUploading(false);
            return toast.error("Something went wrong");
          }
          const [fileResponse] = res;
          const key = fileResponse?.key;
          if (!key) {
            toast.error("Something went wrong");
          }
          clearInterval(progressInterval);
          setUploadProgress(100);
          startPolling({ key });
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div className="flex flex-col gap-4 m-4 text-sm">
            <div
              {...getRootProps()}
              className="flex items-center justify-center transition-all border border-gray-300 border-dashed rounded cursor-pointer h-44 bg-slate-100/90 transit"
            >
              <input
                {...getInputProps()}
                type="file"
                className="hidden"
                id="dropzone-file"
              />
              <div className="flex flex-col items-center justify-center gap-2 m-auto">
                <UploadCloud className="w-4 h-4 text-slate-500" />
                <h1 className="">
                  Drag & drop or{" "}
                  <span className="text-slate-500">choose file</span> to upload
                </h1>
                <p className="text-xs font-medium text-slate-500">
                  .DOCX or .PDF
                </p>
              </div>
            </div>
            {acceptedFiles && acceptedFiles[0] ? (
              isUploading && (
                <div className="px-4 py-6 border rounded h-28">
                  <div className="flex justify-between ">
                    <div className="flex items-center flex-1 gap-2 ">
                      <FileText className="w-4 h-4 text-slate-500" />

                      <div className="w-full text-sm ">
                        <p className="truncate ">{acceptedFiles[0].name}</p>
                        {uploadProgress < 100 ? (
                          <p className="flex items-center gap-1 text-xs text-slate-500">
                            {acceptedFiles[0].size}{" "}
                            <Loader className="w-4 h-4 text-slate-700 animate-spin" />{" "}
                            Uploading...
                          </p>
                        ) : (
                          <p className="flex items-center gap-1 text-xs text-slate-500">
                            {acceptedFiles[0].size / 1000}kb
                            <span className="flex gap-1 text-green-500">
                              <CheckCircle2 className="w-4 h-4 " /> Completed
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    <Trash className="w-4 h-4 cursor-pointer text-slate-500" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Progress value={uploadProgress} />{" "}
                    <span className="text-slate-500">{uploadProgress}%</span>
                  </div>
                </div>
              )
            ) : !isUploading && acceptedFiles ? (
              <div className="px-4 py-6 border border-red-500 rounded ">
                <div className="flex justify-between ">
                  <div className="flex items-center flex-1 gap-2 ">
                    <FileText className="w-4 h-4 text-slate-700" />

                    <div className="w-full text-sm ">
                      <p className=" text-prowse">{acceptedFiles[0].name}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        {acceptedFiles[0].size / 1000}kb
                        <span className="flex gap-1 text-red-500">
                          <XCircle className="w-4 h-4 text-slate-500 " /> Error
                          when uploading
                        </span>
                      </p>
                    </div>
                  </div>

                  <Trash className="w-4 h-4 text-red-500 cursor-pointer" />
                </div>
              </div>
            ) : null}
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
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/80 text-primary-foreground my-4"
          variant={"pleb"}
        >
          <Upload className="w-4 h-4 mr-1.5 text-slate-400" /> click toupload
          your resume
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
