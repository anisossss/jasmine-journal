'use client';
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSlot({
  slot,
  className = "",
  label,
}: {
  slot?: string;
  className?: string;
  label: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  useEffect(() => {
    if (client && slot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {}
    }
  }, [client, slot]);

  if (!client || !slot) {
    return (
      <div className={`ad-placeholder ${className}`} aria-hidden="true">
        <span>{label}</span>
      </div>
    );
  }
  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
