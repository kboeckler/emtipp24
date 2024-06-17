/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns : [
            {
                protocol: 'https',
                hostname: 'img.uefa.com',
                port: '',
                pathname: '/imgml/flags/**'
            }
        ]
    }
};

export default nextConfig;
