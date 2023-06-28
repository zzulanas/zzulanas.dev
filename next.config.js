/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qgxvhncvypeqowyohhys.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/blog-images/*',
            }
        ]
    },
    experimental: {
        mdxRs: true,
    },
}
const withMDX = require('@next/mdx')({
    options: {
        remarkPlugins: [require('remark-code-titles')],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    }
})
module.exports = withMDX(nextConfig)
