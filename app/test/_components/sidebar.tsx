"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Item } from "./item";
import {
  ChevronRight,
  MonitorSmartphone,
  Settings,
  User2Icon,
} from "lucide-react";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const lists = [
    {
      title: "settings",
      icon: Settings,
    },
    {
      title: "User",
      icon: User2Icon,
    },
    {
      title: "Math",
      icon: MonitorSmartphone,
    },
  ];

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div
      className={cn(
        "h-full border-r-2 bg-gray-300 px-4 py-4 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 rounded-full bg-green-600"></div>
        <div onClick={handleCollapse}>
          <ChevronRight />
        </div>
      </div>
      <div className="my-5 flex flex-col gap-2">
        {lists.map((list, i) => (
          <Item key={i} icon={list.icon} title={list.title} />
        ))}
      </div>
      <div>User logout</div>
    </div>
  );
};
