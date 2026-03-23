import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BlogPostCard, { BlogPost as BlogPostType } from "../BlogPostCard";
import PublicationCard from "../PapersCard";
import { CONTENT_BASE_URL } from "../../config";

export default function RecentBlogSection() {
  const { t } = useTranslation();
  const [recentPost, setRecentPost] = useState<BlogPostType | null>(null);
  const [recentPublication, setRecentPublication] =
    useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${CONTENT_BASE_URL}/posts.json`,
        );
        if (!response.ok) throw new Error("Failed to fetch blog posts");
        const posts = await response.json();

        // Sort posts by date
        const sortedPosts = posts.sort((a: BlogPostType, b: BlogPostType) => {
          try {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          } catch (err) {
            console.error("Error sorting post dates:", err);
            return 0; // Keep original order if date comparison fails
          }
        });

        // Separate blogs and papers
        try {
          // Find most recent blog post (without Pub tag)
          const blogPosts = sortedPosts.filter((post: BlogPostType) => {
            if (Array.isArray(post.tags)) {
              return !post.tags.includes("Pub");
            } else if (typeof post.tags === "string") {
              try {
                // Try to parse if it's a JSON string
                const parsedTags = JSON.parse(post.tags);
                return !(
                  Array.isArray(parsedTags) && parsedTags.includes("Pub")
                );
              } catch {
                // If not parseable, check if the string is not "Pub"
                return post.tags !== "Pub";
              }
            }
            return true; // Include posts without tags
          });

          // Find most recent publication (with Pub tag)
          const papers = sortedPosts.filter((post: BlogPostType) => {
            if (Array.isArray(post.tags)) {
              return post.tags.includes("Pub");
            } else if (typeof post.tags === "string") {
              try {
                // Try to parse if it's a JSON string
                const parsedTags = JSON.parse(post.tags);
                return Array.isArray(parsedTags) && parsedTags.includes("Pub");
              } catch {
                // If not parseable, check if the string is "Pub"
                return post.tags === "Pub";
              }
            }
            return false;
          });

          if (blogPosts && blogPosts.length > 0) {
            setRecentPost(blogPosts[0]);
          }

          if (papers && papers.length > 0) {
            setRecentPublication(papers[0]);
          }
        } catch (err) {
          console.error("Error processing posts data:", err);
          throw err;
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch posts",
        );
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("recentContent.loadingTitle")}</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("recentContent.loadingTitle")}</h2>
        <div className="p-6 rounded-xl border border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p>{error}</p>
          <p className="mt-2 text-sm">
            {t("recentContent.errorHint")}
          </p>
        </div>
      </section>
    );

  if (!recentPost && !recentPublication) return null;

  return (
    <div className="space-y-12">
      {/* Recent Blog Post Section */}
      {recentPost && (
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{t("recentContent.blogTitle")}</h2>
            <Link
              to="/blog"
              className="px-4 py-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] text-sm transition-colors"
            >
              {t("recentContent.viewAllBlog")}
            </Link>
          </div>

          <div className="prose prose-adaptive prose-lg max-w-none mb-6">
            <p className="leading-relaxed">
              {t("recentContent.blogIntro")}
            </p>
          </div>

          <BlogPostCard post={recentPost} compact={true} />
        </section>
      )}

      <div className="text-center pt-2">
        <p className="text-sm opacity-80 italic">
          {t("recentContent.blogFooter")}
        </p>
      </div>
      {/* Recent Publication Section */}
      {recentPublication && (
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{t("recentContent.paperTitle")}</h2>
            <Link
              to="/papers"
              className="px-4 py-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] text-sm transition-colors"
            >
              {t("recentContent.viewAllPapers")}
            </Link>
          </div>

          <div className="prose prose-adaptive prose-lg max-w-none mb-6">
            <p className="leading-relaxed">
              {t("recentContent.paperIntro")}
            </p>
          </div>

          <PublicationCard post={recentPublication} compact={true} />
        </section>
      )}
    </div>
  );
}
