/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const path = require('path')
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles', 'sass')],
    prependData: `@import 'abstracts/_index.scss';`
  },
  env: {
    API_TOKEN: process.env.API_TOKEN,
    API_URL: process.env.API_URL,
    API_SLUG: process.env.API_SLUG
  }
  // distDir: 'build',
  // trailingSlash: true
}

module.exports = nextConfig
