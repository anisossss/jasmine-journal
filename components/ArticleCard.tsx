import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/api";

export default function ArticleCard({
  article,
  index = 0,
}: {
  article: Article;
  index?: number;
}) {
  return (
    <article
      className="rise border-t border-hairline pt-6"
      style={{ animationDelay: `${140 + index * 90}ms` }}
    >
      <Link href={`/article/${article.slug}`} className="group block">
        {article.coverImage?.url && (
          <div className="relative mb-6 aspect-[3/2] overflow-hidden bg-mist">
            <Image
              src={article.coverImage.url}
              alt={article.coverImage.alt || article.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        )}
        {article.category && <p className="micro-label mb-3">{article.category}</p>}
        <h3 className="font-display text-[1.6rem] leading-[1.25] font-light text-charcoal">
          <span className="hover-underline">{article.title}</span>
        </h3>
      </Link>
    </article>
  );
}
