import { db } from "@/config/db";
import { file as dbFile } from "@/config/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { pinecone } from "@/lib/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { eq } from "drizzle-orm";

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
      // const createdFile = await db.insert(dbFile).values([
      //   {
      //     key: "",
      //     name: "",
      //     userId: "",
      //     url: "",
      //     uploadStatus: "IN_PROGRESS",

      //   },

      // ]);
      await db.insert(dbFile).values([
        {
          name: file.name,
          size: file.size,
          userId: metadata.userId,
          key: file.key,
          url: file.url,
        },
      ]);
      const createdFile = await db.query.file.findFirst({
        where: (file, { eq }) => eq(file.userId, metadata.userId),
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
              fileId: createdFile?.id,
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

        // await db.file.update({
        //   where: { id: createdFile.id },
        //   data: {
        //     uploadStatus: "SUCCESS",
        //   },
        // });
        await db
          .update(dbFile)
          .set({ uploadStatus: "SUCCESS" })
          .where(eq(dbFile.id, createdFile?.id!));
      } catch (err) {
        console.log(err);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
