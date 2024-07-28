import type { ThemeConfig } from "./theme/type";
import Logo from "./components/logo/Logo";

import LightingIcon from "./assets/icons/lighting.svg";
import GitIcon from "./assets/icons/git.svg";
import ComponentIcon from "./assets/icons/components.svg";
import CliIcon from "./assets/icons/cli.svg";
import MagicIcon from "./assets/icons/magic.svg";
import CodeIcon from "./assets/icons/code.svg";

const themeConfig: ThemeConfig = {
  logo: <Logo />,

  github: 'https://github.com/wisdesignsystem/wis',

  links: [
    {
      title: "Document",
      url: "/get-started/introduction",
    },
    {
      title: "Roadmap",
      url: "http://www.baidu.com",
    },
    {
      title: "Releases",
      url: "http://www.baidu.com",
    },
  ],

  footerLinks: [],

  socials: [],

  algolia: {
    appId: 'R2IYF7ETH7',
    apiKey: '599cec31baffa4868cae4e79f180729b',
    indexName: 'docsearch',
  },

  icons: {
    LightingIcon: <LightingIcon />,
    GitIcon: <GitIcon />,
    ComponentIcon: <ComponentIcon />,
    CliIcon: <CliIcon />,
    MagicIcon: <MagicIcon />,
    CodeIcon: <CodeIcon />,
  },

  language: {
    "zh-CN": {
      links: [
        {
          title: "文档",
          url: "/get-started/introduction",
        },
        {
          title: "计划",
          url: "http://www.baidu.com",
        },
        {
          title: "版本",
          url: "http://www.baidu.com",
        },
      ],
    }
  },
};

export default themeConfig;
