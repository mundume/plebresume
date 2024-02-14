import { db } from "@/config/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { pinecone } from "@/lib/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server b(efore upload
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      // If you throw, the user will not be able to upload
      if (!user || !user.id) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          uploadStatus: "PROCESSING",
        },
      });
      try {
        const response = await fetch(`${file.url}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const blob = await response.blob();
        const loader = new PDFLoader(blob);
        const pageLevelDocs = (await loader.load()).map((doc) => {
          return {
            ...doc,
            metadata: {
              ...doc.metadata,
              fileId: createdFile.id,
            },
          };
        });

        const pineconeIndex = pinecone
          .Index("plebresume")
          .namespace(metadata.userId);
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          pineconeIndex,
        });

        await db.file.update({
          where: { id: createdFile.id },
          data: {
            uploadStatus: "SUCCESS",
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
