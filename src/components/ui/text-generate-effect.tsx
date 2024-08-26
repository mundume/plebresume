"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import Link from "next/link";
import { Github, MoveRight } from "lucide-react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  user,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  user: KindeUser | null;
}) => {
  const [scope, animate] = useAnimate();
  const [showButton, setShowButton] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (scope.current) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.2),
        }
      ).then(() => setShowButton(true));
    }
  }, [scope, animate, filter, duration]);

  const renderWords = useCallback(() => {
    return wordsArray.map((word, idx) => (
      <motion.span
        key={word + idx}
        className="dark:text-white text-black opacity-0"
        style={{
          filter: filter ? "blur(10px)" : "none",
        }}
      >
        {word}{" "}
      </motion.span>
    ));
  }, [wordsArray, filter]);

  return (
    <div className={cn("font-medium", className)}>
      <motion.div
        ref={scope}
        className="mt-4 dark:text-white text-black text-2xl leading-snug tracking-wide"
      >
        {renderWords()}
      </motion.div>
      {showButton && (
        <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
          <Link
            href="https://github.com/mundume/plebresume"
            target="_blank"
            onClick={() => console.log("clicked")}
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "outline",
              }),
              "rounded-full cursor-pointer mt-4 flex items-center"
            )}
          >
            <Github className="w-5 h-5 mr-2 text-slate-600" />
            github
          </Link>
          {user ? null : (
            <Link
              href="/sign-in"
              onClick={() => console.log("clicked")}
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "outline",
                }),
                "rounded-full cursor-pointer mt-4 flex items-center"
              )}
            >
              sign in <MoveRight className="w-5 h-5 ml-2 text-slate-600" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
