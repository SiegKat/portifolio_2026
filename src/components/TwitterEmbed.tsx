import { useEffect } from "react";

interface TwitterTweetProps {
  tweetId: string;
}

export default function TwitterTweet({ tweetId }: TwitterTweetProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        Your pinned tweet text here.
      </p>
      &mdash; Your Name (@yourhandle)
      <a
        href={`https://twitter.com/yourhandle/status/${tweetId}?ref_src=twsrc%5Etfw`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Date
      </a>
    </blockquote>
  );
}
