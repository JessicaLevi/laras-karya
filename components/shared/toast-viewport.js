"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Sparkles, TriangleAlert, X } from "lucide-react";

const ICONS = { check: Check, sparkles: Sparkles, alert: TriangleAlert };

const TONES = {
  light: {
    box: "border-brand bg-brand-light text-ink",
    icon: "bg-white text-brand",
    link: "text-brand",
    close: "text-ink/60 hover:text-ink",
  },
  dark: {
    box: "border-teal-500 bg-ink text-white",
    icon: "bg-teal-500/20 text-teal-300",
    link: "text-teal-300",
    close: "text-white/70 hover:text-white",
  },
};

function ToastItem({ toast, onDismiss }) {
  const { id, message, action, tone, icon, duration, role } = toast;
  const t = TONES[tone] ?? TONES.light;
  const Icon = ICONS[icon ?? (tone === "dark" ? "sparkles" : "check")] ?? Check;

  // Timer berhenti saat kursor di atas toast atau fokus keyboard di dalamnya (WCAG 2.2.1).
  const [paused, setPaused] = useState(false);
  const remaining = useRef(duration);
  const startedAt = useRef(0);

  useEffect(() => {
    if (paused || !duration) return;
    startedAt.current = Date.now();
    const timer = setTimeout(() => onDismiss(id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt.current;
    };
  }, [paused, duration, id, onDismiss]);

  const actionClass = `mt-2 inline-block text-sm font-semibold underline underline-offset-2 ${t.link}`;

  return (
    <div
      role={role ?? "status"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onDismiss(id);
      }}
      className={`pointer-events-auto relative flex items-start gap-3 rounded-xl border-l-4 py-4 pl-4 pr-11 shadow-xl animate-in fade-in slide-in-from-right-4 duration-300 ${t.box}`}
    >
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${t.icon}`} aria-hidden>
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0 text-sm leading-snug">
        <p>{message}</p>
        {action?.href && (
          <Link href={action.href} onClick={() => onDismiss(id)} className={actionClass}>
            {action.label}
          </Link>
        )}
        {action?.onClick && !action.href && (
          <button
            type="button"
            onClick={() => {
              action.onClick();
              onDismiss(id);
            }}
            className={actionClass}
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Tutup notifikasi"
        className={`absolute right-3 top-3 rounded p-0.5 transition ${t.close}`}
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      role="region"
      aria-label="Notifikasi"
      className="pointer-events-none fixed inset-x-4 top-20 z-[60] flex flex-col gap-3 md:inset-x-auto md:right-6 md:w-[420px]"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
