/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['mysql2'],
	},
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
