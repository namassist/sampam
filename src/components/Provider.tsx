"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { Next13ProgressBar } from "next13-progressbar";

interface SessionProps {
  children: ReactNode;
}

const Provider: FC<SessionProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Next13ProgressBar
        height="2px"
        color="#9625f9"
        options={{ showSpinner: true }}
        showOnShallow
      />
      {children}
    </SessionProvider>
  );
};

export default Provider;
