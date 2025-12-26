"use client";

import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  description?: string;
  image: string;
  price?: number;
  badge?: string;
  category?: string;
  href?: string;
  className?: string;
}

export function Card({
  title,
  description,
  image,
  price,
  badge,
  category,
  href = "#",
  className = "",
}: CardProps) {
  const cardContent = (
    <>
      {/* Image container */}
      <div className="relative aspect-square bg-light-200 overflow-hidden">
        {/*{badge && (*/}
        {/*  <span className="absolute top-4 left-4 z-10 bg-orange text-light-100 text-caption font-caption px-3 py-1 rounded-sm">*/}
        {/*    {badge}*/}
        {/*  </span>*/}
        {/*)}*/}
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/*{category && (*/}
        {/*  <span className="text-caption font-caption text-dark-700 block mb-1">*/}
        {/*    {category}*/}
        {/*  </span>*/}
        {/*)}*/}
        <h3 className="text-body font-body-medium text-dark-900 line-clamp-1">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-caption text-dark-700 line-clamp-2">
            {description}
          </p>
        )}
        {price !== undefined && (
          <p className="mt-2 text-body font-body-medium text-dark-900">
            ${price.toFixed(2)}
          </p>
        )}
      </div>
    </>
  );

  return (
    <article
      className={`group bg-light-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {href ? (
        <Link href={href} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </article>
  );
}
