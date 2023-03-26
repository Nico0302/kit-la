import nextra from 'nextra'
import wikiLinks from '@flowershow/remark-wiki-link';
import embed from '@flowershow/remark-embed';
import callouts from "remark-callouts";
import { remarkMermaid } from 'remark-mermaid-nextra';
import { pageResolver } from './utils/normalizeURL.mjs';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  staticImage: true,
  mdxOptions: {
    remarkPlugins: [
      remarkMermaid,
      [wikiLinks, { pageResolver }],
      callouts,
      embed,
    ],
  },
})

export default withNextra({
  reactStrictMode: true,
})
