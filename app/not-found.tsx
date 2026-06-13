import Link from "next/link";
import JasmineMark from "@/components/JasmineMark";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-40 text-center">
      <JasmineMark className="rise mx-auto h-8 w-8 text-jasmine" />
      <p className="rise micro-label mt-10" style={{ animationDelay: "100ms" }}>
        Error 404
      </p>
      <h1
        className="rise mt-6 font-display text-5xl font-light text-charcoal sm:text-6xl"
        style={{ animationDelay: "180ms" }}
      >
        This page has drifted away
      </h1>
      <p
        className="rise mx-auto mt-6 max-w-md leading-relaxed text-charcoal/60"
        style={{ animationDelay: "260ms" }}
      >
        Like a petal on the evening breeze, the story you were looking for is no
        longer here. Perhaps it moved — perhaps it never bloomed.
      </p>
      <Link
        href="/"
        className="rise hover-underline mt-10 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-jasmine"
        style={{ animationDelay: "340ms" }}
      >
        Return to the front page
      </Link>
    </section>
  );
}
