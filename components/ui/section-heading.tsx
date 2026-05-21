import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-4", align === "center" && "mx-auto text-center")}>
      <p className="text-xs uppercase tracking-[0.35em] text-white/50">{eyebrow}</p>
      <h2 className="font-[var(--font-display)] text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="text-sm leading-7 text-white/68 sm:text-base">{description}</p>
    </div>
  );
}
