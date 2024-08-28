import { config } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: ['slayerdev056792.s3.amazonaws.com', 'localhost']
   }
};

export default nextConfig;
