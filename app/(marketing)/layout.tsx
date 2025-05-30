import React from "react";
import { Navbar } from "./_components/Navbar";

const MarketignLayout = ({ children }: { children: React.ReactNode }) => {
    
  return (
    <div className='h-screen dark:bg-[#1f1f1f]'>
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default MarketignLayout;
