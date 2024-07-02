/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/submit/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/login/:path*",
        destination: "/",
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "**",
      //   port: "",
      //   pathname: "**",
      // },
      // {
      //   protocol: "http",
      //   hostname: "**",
      //   port: "",
      //   pathname: "**",
      // },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product-logos/**/**",
      },
    ],
  },
}

module.exports = nextConfig
