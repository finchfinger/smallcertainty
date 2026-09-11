import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects(){
    return [
      {source:"/catalog/culture/best-board-game",destination:"/catalog/home/best-board-game",permanent:true},
      {source:"/catalog/culture/best-chess-set",destination:"/catalog/home/best-chess-set",permanent:true},
    ];
  },
};

export default nextConfig;
