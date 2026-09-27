import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spotify Rewards – Evaluate & Earn" },
      {
        name: "description",
        content: "Evaluate music and earn rewards with Spotify Rewards.",
      },
      { property: "og:title", content: "Spotify Rewards – Evaluate & Earn" },
      {
        property: "og:description",
        content: "Evaluate music and earn rewards with Spotify Rewards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/app.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">
        Redirecting to app…{" "}
        <a href="/app.html" className="text-primary underline">
          Open app
        </a>
      </p>
    </div>
  );
}
