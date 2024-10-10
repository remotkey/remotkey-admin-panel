/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
            {
                protocol: "https",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "remotkey.sfo2.digitaloceanspaces.com"
            },
            {
                protocol: "https",
                hostname: "openweathermap.org"
            }
        ],
    },
};

export default nextConfig;
