import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The live Sites build keeps its existing runtime. Netlify receives a fully
  // static export, which is faster, cheaper to host, and easy to redeploy.
  ...(process.env.NETLIFY_STATIC_EXPORT === "true"
    ? {
        output: "export" as const,
        trailingSlash: true,
        typescript: {
          tsconfigPath: "tsconfig.netlify.json",
        },
      }
    : {}),
};

export default nextConfig;
