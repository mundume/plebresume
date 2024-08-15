import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function Submit({ onClick }: any) {
  const { pending } = useFormStatus();
  const [generation, setGeneration] = useState<string>("");
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={pending}
      className="mt-8 bg-gradient-to-br relative group/btn from-emerald-500 via-emerald-600 to-emerald-500 dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      aria-disabled={pending}
    >
      {pending ? "Signing in...." : "Sign in"} &rarr;
    </button>
  );
}
