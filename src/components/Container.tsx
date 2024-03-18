import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-1 flex-row flex-wrap items-center justify-center gap-7">
      {children}
    </main>
  );
};

export default Container;
