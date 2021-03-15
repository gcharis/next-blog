/**
 * @type {import("next/dist/next-server/server/config").NextConfig}
 */
module.exports = {
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.DefinePlugin({
        EXT_API_HOST: JSON.stringify(process.env.EXT_API_HOST),
      }),
    );

    // Important: return the modified config
    return config;
  },
};
