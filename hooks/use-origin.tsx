"use client";

import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  //window.loaction.origin gives you the baseUrl of the page you are on.
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return "";
  return origin;
};
