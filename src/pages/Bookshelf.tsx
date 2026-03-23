import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import { useTranslation } from "react-i18next";

interface Book {
  title: string;
  author: string;
  coverUrl?: string;
  rating?: number;
  review?: string;
  dateRead?: string;
  link?: string;
  category: string;
  image?: string;
  description?: string;
}

const books: Book[] = [
  {
    title: "Example Book Title",
    author: "Author Name",
    link: "#",
    image: "/assets/Book/book1.jpg",
    description:
      "A short review or description of the book and why it was meaningful to you.",
    category: "Category",
    rating: 5,
    dateRead: "2026-01-15",
  },
  {
    title: "Another Book Title",
    author: "Another Author",
    link: "#",
    category: "Another Category",
    rating: 4,
    dateRead: "2025-12-01",
  },
];

export default function Bookshelf() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams] = useSearchParams();

  // Initialize category from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "";
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(books.map((book) => book.category)),
    );
    return uniqueCategories.sort();
  }, []);

  // Filter books by category
  const filteredBooks = useMemo(() => {
    if (!selectedCategory) return books;
    return books.filter((book) => book.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 p-4"
    >
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("bookshelf.title")}</h1>
          <FilterDropdown
            options={categories}
            selectedOption={selectedCategory}
            onSelect={setSelectedCategory}
            label={t("bookshelf.filterCategory")}
            paramName="category"
          />
        </div>
        <p className="text-lg">
          {t("bookshelf.intro")}
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredBooks.map((book, index) => (
          <motion.article
            key={book.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-lg border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-4">
                {book.image && (
                  <img
                    src={book.image}
                    alt={t("bookshelf.coverAlt", { title: book.title })}
                    className="w-16 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{book.title}</h2>
                  <p className="text-sm text-[color-mix(in_oklch,var(--color-primary)_70%,transparent)]">
                    {book.author}
                  </p>
                  <p className="text-xs mt-1">{book.category}</p>
                </div>
              </div>
              {typeof book.rating === "number" && (
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < book.rating!
                          ? "text-[var(--color-primary)]"
                          : "text-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>

            {book.description && (
              <blockquote className="my-4 text-sm italic">
                "{book.description}"
              </blockquote>
            )}

            <div className="flex justify-between items-center mt-4 text-sm">
              {book.dateRead && (
                <time dateTime={book.dateRead}>
                  {t("bookshelf.readPrefix")}
                  {new Date(book.dateRead).toLocaleDateString(i18n.language, {
                    year: "numeric",
                    month: "long",
                  })}
                </time>
              )}
              {book.link && (
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("bookshelf.viewBook")}
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
