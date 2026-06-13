import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/api";
import { formatDate } from "@/lib/format";
import AdSlot from "@/components/AdSlot";
import ArticleCard from "@/components/ArticleCard";
import JasmineDivider from "@/components/JasmineDivider";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return { title: "Story not found" };
  }

  const title = article.seo?.metaTitle || article.title;
  const description = article.seo?.metaDescription || article.excerpt || "";
  const canonical =
    article.seo?.canonicalUrl || `${SITE_URL}/article/${article.slug}`;
  const image = article.seo?.ogImage || article.coverImage?.url;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: "Jasmine Journal",
      images: image ? [{ url: image }] : undefined,
      publishedTime: article.publishedAt,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: { index: !article.seo?.noIndex },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = article.category
    ? await getArticles({
        category: article.category,
        exclude: article.slug,
        limit: 3,
      })
    : { articles: [] };

  const canonical =
    article.seo?.canonicalUrl || `${SITE_URL}/article/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seo?.metaDescription || article.excerpt || "",
    image: [article.seo?.ogImage || article.coverImage?.url].filter(Boolean),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [{ "@type": "Person", name: article.author?.name || "Newsroom" }],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "Jasmine Journal",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: article.category,
    keywords: article.seo?.keywords?.join(", "),
  };

  return (
    <article className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Headline block */}
      <header className="rise mx-auto max-w-3xl px-6 text-center">
        {article.category && (
          <Link
            href={`/category/${encodeURIComponent(article.category)}`}
            className="micro-label hover-underline inline-block"
          >
            {article.category}
          </Link>
        )}
        <h1 className="mt-6 font-display text-4xl font-light leading-[1.12] text-charcoal sm:text-5xl md:text-[3.5rem]">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mx-auto mt-7 max-w-xl font-display text-xl font-light italic leading-relaxed text-charcoal/65">
            {article.excerpt}
          </p>
        )}
        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.26em] text-charcoal/45">
          By {article.author?.name || "Newsroom"}
          {article.publishedAt && <> · {formatDate(article.publishedAt)}</>}
        </p>
      </header>

      {/* Full-bleed cover image */}
      {article.coverImage?.url && (
        <div
          className="rise relative mt-14 aspect-[16/9] w-full overflow-hidden bg-mist md:aspect-[21/9]"
          style={{ animationDelay: "160ms" }}
        >
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt || article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Measured reading column */}
      <div
        className="rise mx-auto mt-16 max-w-[65ch] px-6"
        style={{ animationDelay: "280ms" }}
      >
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />

        {article.tags && article.tags.length > 0 && (
          <ul className="mt-14 flex flex-wrap justify-center gap-3">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="border border-hairline px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/55"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <JasmineDivider className="mt-16" />

        {/* End-of-article ad */}
        <div className="mt-12">
          <AdSlot
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE}
            label="Advertisement"
          />
        </div>
      </div>

      {/* Related stories */}
      {related.articles.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <h2 className="micro-label text-center">Further reading</h2>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.articles.map((item, index) => (
              <ArticleCard key={item._id} article={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
