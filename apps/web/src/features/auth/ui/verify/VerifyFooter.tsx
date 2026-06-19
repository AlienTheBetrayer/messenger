"use client";

import { Button, CardFooter, Spinner } from "@/shared";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const VerifyFooter = () => {
  const isLoading = useIsLoading(["login", "signup", "forgotPassword"]);

  return (
    <CardFooter className="flex flex-col gap-2 px-6 pt-0 pb-8 mt-1 border-t border-border/40 bg-muted/10">
      <div className="w-full pt-6">
        <Button
          disabled={isLoading}
          type="submit"
          size="lg"
          className="w-full h-11 text-sm font-semibold shadow-md shadow-primary/5 gap-2 transition-all duration-200"
        >
          {isLoading ? <Spinner className="size-4 text-primary-foreground/70" /> : "Verify Identity"}
        </Button>
      </div>
    </CardFooter>
  );
};