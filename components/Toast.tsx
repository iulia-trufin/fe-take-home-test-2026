"use client";

import React from "react";

interface ToastProps {
  message: string | null;
}

export const Toast = ({ message }: ToastProps) => {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in">
      <div className="rounded-xl bg-neutral-900 px-6 py-3 text-base font-medium text-white shadow-xl border border-white/10">
        {message}
      </div>
    </div>
  );
};
