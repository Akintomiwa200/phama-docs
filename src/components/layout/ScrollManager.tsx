"use client";

import { useEffect } from "react";

export function ScrollManager() {
  useEffect(() => {
    const root = document.documentElement;
    let timer: number | undefined;

    const onScroll = () => {
      root.classList.add("is-scrolling");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        root.classList.remove("is-scrolling");
      }, 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}