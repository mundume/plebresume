import {
  pgTable,
  uniqueIndex,
  pgEnum,
  text,
  foreignKey,
  timestamp,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const generateRandomId = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
export const uploadStatus = pgEnum("UploadStatus", [
  "SUCCESS",
  "FAILED",
  "PROCESSING",
  "PENDING",
]);

export const user = pgTable(
  "User",
  {
    id: text("id").primaryKey().notNull(), //auth id
    email: text("email").notNull(),
    firstName: text("firstName").notNull(),
    lastName: text("lastName").notNull(),
  },
  (table) => {
    return {
      idKey: uniqueIndex("User_id_key").on(table.id),
      emailKey: uniqueIndex("User_email_key").on(table.email),
    };
  }
);

export const file = pgTable("File", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateRandomId(20)),
  name: text("name").notNull(),
  uploadStatus: uploadStatus("uploadStatus").default("PENDING").notNull(),
  url: text("url"),
  key: text("key"),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" })
    .notNull()
    .defaultNow(),
  userId: text("userId").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  size: integer("size"),
});

export const coverLetter = pgTable("CoverLetter", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateRandomId(20)),
  text: text("text"),
  name: text("name").notNull(),
  url: text("url"),
  key: text("key"),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  fileId: text("fileId").references(() => file.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  userId: text("userId").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  resumeId: text("resumeId").references(() => resume.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});

export const resume = pgTable("Resume", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateRandomId(20)),
  text: text("text"),
  name: text("name").notNull(),
  url: text("url"),
  key: text("key"),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  fileId: text("fileId").references(() => file.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  userId: text("userId").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});
