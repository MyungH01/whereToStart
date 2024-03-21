/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {},
	images: {
		remotePatterns: [
			{
				hostname: 'cdn.discordapp.com',
				pathname: '/**',
				port: '',
				protocol: 'https',
			},
		],
	},
};
export default nextConfig;
