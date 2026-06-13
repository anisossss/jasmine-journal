import JasmineMark from "@/components/JasmineMark";

export default function JasmineDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className}`} role="separator">
      <span className="h-px flex-1 bg-hairline" />
      <JasmineMark className="h-4 w-4 shrink-0 text-jasmine" />
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}
