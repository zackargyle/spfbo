/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'uploads-ssl.webflow.com',
                port: '',
            },
            {
                protocol: 'http',
                hostname: 'a86e0a17-spfbo.s3-website-us-east-1.amazonaws.com',
                port: '',
            }
        ],
    }
};

export default nextConfig;
