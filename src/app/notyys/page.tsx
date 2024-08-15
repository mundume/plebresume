"use client";

import { useState, useTransition } from "react";
import { getNotifications } from "./actions";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Page() {
  const [generation, setGeneration] = useState<string>("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="p-4">
      <button
        onClick={async () => {
          startTransition(async () => {
            const { notifications: newNotifications } = await getNotifications(
              "Messages during the beer party."
            );
            setGeneration(JSON.stringify({ newNotifications }, null, 2));
          });
        }}
      >
        {pending ? "Generating..." : "Generate"}
      </button>

      <pre>{generation}</pre>
    </div>
  );
}
