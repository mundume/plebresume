This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Plebresume AI Cover Letter & Resume Builder

A powerful AI-driven tool to generate customized cover letters and resumes tailored to specific job descriptions.

## Features

- **AI-Powered**: Leverages AI to generate tailored cover letters and resumes.
- **Job Description Parsing**: Automatically extracts key details from job descriptions.
- **Customization**: Allows easy editing and personalization of generated documents.
- **Export Options**: Supports exporting to PDF.
- **Responsive**: insanely responsive on mobile.

## Tech Stack

- [Next.js](https://nextjs.org/) - frontend and ai sdk
- [TailwindCSS](https://tailwindcss.com/) - styling
- [shadcn](https://ui.shadcn.com/) - native radix ui primitives
- [Prisma](https://prisma.io/) - schema generation
- [Pinecone](https://pinecone.io/) - vector database and indexing
- [Vercel](https://vercel.com/) - deployment and hosting
- [supabase](https://supabase.com/) - database
- [OpenAI](https://openai.com/) - ai
- [Sentry](https://sentry.io/) - error tracking
- [Supabase](https://supabase.com/) - database
- [kinde](https://kinde.com/) - auth
- [OneDoc](https://www.fileforge.com/) - PDF API

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mundume/plebresume.git
   ```
2. **install the dependencies:**
   ```bash
   pnpm i
   #or
   bun i
   ```
3. **Add your env variables to the env file using the format r**

   ```bash
   DATABASE_URL=
   KINDE_POST_LOGIN_REDIRECT_URL=
   KINDE_POST_LOGOUT_REDIRECT_URL=
   SENTRY_AUTH_TOKEN=
   NEXT_PUBLIC_SENTRY_DSN=
   KINDE_CLIENT_ID=
   KINDE_CLIENT_SECRET=
   KINDE_ISSUER_URL=
   KINDE_SITE_URL=
   DIRECT_URL=
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=
   PINECONE_API_KEY=
   OPENAI_API_KEY=
   ONEDOC_API_KEY=
   ```

4. **Run your project:**
   ```bash
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
