import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev is proxied through tailscale serve (devhub:9443 -> localhost:3005)
  allowedDevOrigins: ["devhub.taile34b62.ts.net"],
};

export default nextConfig;
