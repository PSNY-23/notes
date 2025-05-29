"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ItemProps {
  icon: React.ElementType;
  title: string;
}

export const Item = ({ icon: Icon, title }: ItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="flex gap-2">
          <Icon />
          <span>{title}</span>
        </span>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </div>
    </div>
  );
};
