const ModuleFederationWebpackPlugin = require("@module-federation/nextjs-mf");
const withNextra = require("nextra")({
  theme: "./theme/Theme.tsx",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
});

module.exports = withNextra({
  i18n: {
    locales: ["en-US", "zh-CN"],
    defaultLocale: "en-US",
  },

  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            replaceAttrValues: {
              "#000": "currentColor",
              "#000000": "currentColor",
            },
          },
        },
      ],
    });

    config.plugins.push(
      new ModuleFederationWebpackPlugin({
        name: "website",
        remotes: {
          wis: `wis@http://localhost:3001/remote.js`,
        },
        force: true,
        filename: "remote.js",
        exposes: {},
      })
    );
    return config;
  },
});
