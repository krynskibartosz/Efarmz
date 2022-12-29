/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'unsplash.com',
            'https://efarmz.be/api/v1/',
            'https://efarmz.be',
        ],
    },
};

module.exports = nextConfig;
