import React from "react";
import { Sidebar } from "./_components/sidebar";
import { Header } from "./_components/header";

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default TestLayout;
