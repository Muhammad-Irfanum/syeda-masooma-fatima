import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // The build script runs `tsc --noEmit` first. This avoids Next spawning
    // a second checker process, which is restricted in this Windows workspace.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
