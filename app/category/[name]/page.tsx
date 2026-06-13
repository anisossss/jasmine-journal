import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import JasmineDivider from "@/components/JasmineDivider";
import JasmineMark from "@/components/JasmineMark";

const PAGE_SIZE = 12;

type Props = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const category = decodeURIComponent(name);
  return {
    title: category,
    description: `The latest ${category} stories from Jasmine Journal — quiet, considered news from Tunisia.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { name } = await params;
  const { page: pageParam } = await searchParams;
  const category = decodeURIComponent(name);
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { articles, total, pages } = await getArticles({
    category,
    page,
    limit: PAGE_SIZE,
  });

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <header className="rise text-center">
        <p className="micro-label">Section</p>
        <h1 className="mt-5 font-display text-5xl font-light text-charcoal sm:text-6xl">
          {category}
        </h1>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-charcoal/45">
          {total} {total === 1 ? "story" : "stories"}
        </p>
      </header>

      <JasmineDivider className="mt-12" />

      {articles.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article._id} article={article} index={index} />
          ))}
        </div>
      ) : (
        <div className="rise mx-auto max-w-md py-24 text-center">
          <JasmineMark className="mx-auto h-7 w-7 text-jasmine" />
          <p className="mt-8 font-display text-3xl font-light text-charcoal">
            Nothing here yet
          </p>
          <p className="mt-4 leading-relaxed text-charcoal/60">
            This section is still in bloom. While it grows, the front page has
            plenty to read.
          </p>
          <Link
            href="/"
            className="hover-underline mt-8 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-jasmine"
          >
            Back to the front page
          </Link>
        </div>
      )}

      {pages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-20 flex items-center justify-center gap-10 border-t border-hairline pt-8"
        >
          {page > 1 ? (
            <Link
              href={`/category/${encodeURIComponent(category)}?page=${page - 1}`}
              className="hover-underline text-[11px] font-bold uppercase tracking-[0.22em] text-jasmine"
            >
              ← Newer
            </Link>
          ) : (
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-charcoal/25">
              ← Newer
            </span>
          )}
          <span className="micro-label">
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link
              href={`/category/${encodeURIComponent(category)}?page=${page + 1}`}
              className="hover-underline text-[11px] font-bold uppercase tracking-[0.22em] text-jasmine"
            >
              Older →
            </Link>
          ) : (
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-charcoal/25">
              Older →
            </span>
          )}
        </nav>
      )}
    </section>
  );
}
