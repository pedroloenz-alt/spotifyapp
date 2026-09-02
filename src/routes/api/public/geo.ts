import { createFileRoute } from "@tanstack/react-router";

const HEADER_CANDIDATES = [
  "cf-ipcountry",
  "x-vercel-ip-country",
  "x-country-code",
  "x-geo-country",
  "fastly-client-country",
];

export const Route = createFileRoute("/api/public/geo")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        let country = "";
        for (const header of HEADER_CANDIDATES) {
          const value = request.headers.get(header);
          if (value && value !== "XX" && value !== "T1") {
            country = value.toUpperCase().slice(0, 2);
            break;
          }
        }

        return new Response(JSON.stringify({ country }), {
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
