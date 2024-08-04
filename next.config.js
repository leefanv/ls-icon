const withNextra = require("nextra")({
  theme: "./theme/Theme.tsx",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  i18n: {
    locales: ["en-US", "zh-CN"],
    defaultLocale: "en-US",
  },

  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.(tsx|mdx)?$/,
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
    return config;
  },
});
