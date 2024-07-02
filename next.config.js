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
    ENDPOINT_SESSOES: process.env.ENDPOINT_SESSOES,
    ENDPOINT_ESTADOS_CIDADES: process.env.ENDPOINT_ESTADOS_CIDADES,
    FILME_ID: process.env.FILME_ID
  }
  // distDir: 'build',
  // trailingSlash: true
}

module.exports = nextConfig
