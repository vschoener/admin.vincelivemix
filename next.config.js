const svgLoader = {
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
};

const imageLoader = {
  test: [/\.bmp$/i, /\.gif$/i, /\.jpe?g$/i, /\.png$/i],
  loader: 'url-loader',
  options: {
    limit: 10000,
    fallback: 'file-loader',
    name: '[name].[hash:8].[ext]',
    publicPath: '/_imported-assets/',
    outputPath: '../public/_imported-assets/',
  },
};

module.exports = {
  webpack(config) {
    config.module.rules.push(svgLoader);
    config.module.rules.push(imageLoader);

    return config;
  },
  serverRuntimeConfig: {
    backend: {
      url: process.env.BACKEND_URL || 'http://localhost:3000',
    },
  },
  publicRuntimeConfig: {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'http://localhost:3000',
  },
};
