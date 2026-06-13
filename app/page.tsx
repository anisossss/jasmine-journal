import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/api";
import { formatDate } from "@/lib/format";
import AdSlot from "@/components/AdSlot";
import ArticleCard from "@/components/ArticleCard";
import JasmineDivider from "@/components/JasmineDivider";
import JasmineMark from "@/components/JasmineMark";

export default async function HomePage() {
  const [featuredRes, latestRes] = await Promise.all([
    getArticles({ featured: true, limit: 1 }),
    getArticles({ limit: 1 }),
  ]);
  const lead = featuredRes.articles[0] ?? latestRes.articles[0] ?? null;

  if (!lead) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-40 text-center">
        <JasmineMark className="rise mx-auto h-8 w-8 text-jasmine" />
        <h1
          className="rise mt-10 font-display text-5xl font-light text-charcoal"
          style={{ animationDelay: "120ms" }}
        >
          Fresh ink coming soon…
        </h1>
        <p
          className="rise mx-auto mt-6 max-w-md leading-relaxed text-charcoal/60"
          style={{ animationDelay: "240ms" }}
        >
          Our first stories are still drying on the page. Return shortly — the
          jasmine opens at dusk.
        </p>
      </section>
    );
  }

  const { articles } = await getArticles({ limit: 12, exclude: lead.slug });

  return (
    <>
      {/* Lead story */}
      <section className="pt-16">
        <div className="rise mx-auto max-w-3xl px-6 text-center">
          {lead.category && <p className="micro-label mb-5">{lead.category}</p>}
          <h1 className="font-display text-4xl font-light leading-[1.12] text-charcoal sm:text-5xl md:text-[3.75rem]">
            <Link href={`/article/${lead.slug}`} className="hover-underline">
              {lead.title}
            </Link>
          </h1>
          {lead.excerpt && (
            <p className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-relaxed text-charcoal/65">
              {lead.excerpt}
            </p>
          )}
          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.26em] text-charcoal/45">
            {lead.author?.name || "Newsroom"}
            {lead.publishedAt && <> · {formatDate(lead.publishedAt)}</>}
          </p>
        </div>

        {lead.coverImage?.url && (
          <Link
            href={`/article/${lead.slug}`}
            className="rise mt-14 block"
            style={{ animationDelay: "180ms" }}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-mist md:aspect-[21/9]">
              <Image
                src={lead.coverImage.url}
                alt={lead.coverImage.alt || lead.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Link>
        )}
      </section>

      {/* Discreet banner below the lead story */}
      <div
        className="rise mx-auto mt-16 max-w-4xl px-6"
        style={{ animationDelay: "300ms" }}
      >
        <AdSlot
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP}
          label="Advertisement"
        />
      </div>

      {/* Latest stories */}
      <section className="mx-auto mt-24 max-w-6xl px-6">
        <JasmineDivider />
        <h2 className="micro-label mt-10 text-center">The latest stories</h2>

        {articles.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article._id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center font-display text-2xl font-light italic text-charcoal/55">
            More stories are on their way — the garden is still in bloom.
          </p>
        )}
      </section>
    </>
  );
}
