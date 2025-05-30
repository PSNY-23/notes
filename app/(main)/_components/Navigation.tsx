"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./UserItem";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./Item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { Navbar } from "./navbar";

export const Navigation = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");

  const create = useMutation(api.documents.create);
  const search = useSearch();
  const settings = useSettings();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    newWidth = Math.min(Math.max(newWidth, 240), 512); // Clamp width

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.left = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      const width = isMobile ? "100%" : "256px";
      const left = isMobile ? "100%" : "256px";
      const contentWidth = isMobile ? "0" : "calc(100% - 256px)";

      sidebarRef.current.style.width = width;
      navbarRef.current.style.left = left;
      navbarRef.current.style.width = contentWidth;

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.left = "0";
      navbarRef.current.style.width = "100%";

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`),
    );
    toast.promise(promise, {
      loading: "Creating new note...",
      success: "Note created",
      error: "Failed to create new note",
    });
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar bg-secondary relative z-[99999] flex h-full flex-col overflow-y-auto transition-all duration-300 ease-in-out",
          isMobile ? "w-0" : "w-64",
          isResetting && "pointer-events-none",
        )}
      >
        {/* Collapse button */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "text-muted-foreground absolute top-3 right-2 h-6 w-6 cursor-pointer rounded-sm transition hover:bg-neutral-300 dark:hover:bg-neutral-700",
            isMobile
              ? "opacity-100"
              : "opacity-0 group-hover/sidebar:opacity-100",
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>

        {/* Sidebar content */}
        <div className="px-4 py-2">
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
        </div>
        <div className="mt-4 ml-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-0"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="bg-primary/20 absolute top-0 right-0 h-full w-1 cursor-ew-resize opacity-0 transition-opacity group-hover/sidebar:opacity-100"
        />
      </aside>

      {/* Main content container */}
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] h-12 transition-all duration-300 ease-in-out",
          isMobile ? "left-0 w-full" : "left-64 w-[calc(100%-256px)]",
          isResetting && "pointer-events-none",
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="flex w-full items-center bg-transparent px-3 py-2">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="text-muted-foreground h-6 w-6 cursor-pointer"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
