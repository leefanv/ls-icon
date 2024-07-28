export default function (agent = "pc") {
  let theme = "light";
  if (typeof window !== "undefined") {
    theme = document.documentElement.getAttribute("data-theme") || theme;
  }

  const themeAttr = theme !== "light" ? `data-theme="${theme}"` : "";

  return `
  <!DOCTYPE html>
  <html ${themeAttr}>
    <head>
      <style>
        :root {
          --wd-palette-gray-20: #E2E8F0;
          --wd-palette-common-white: #FFFFFF;
          --wd-border-color-01: var(--wd-palette-gray-20);
          --wd-background-color-default: var(--wd-palette-common-white);
        }

        html[data-theme='dark'] {
          --wd-palette-common-black: #0F172A;
          --wd-background-color-default: var(--wd-palette-common-black);
          --wd-border-color-01: rgba(255, 255, 255, 0.10);

          color-schema: dark;
          background: var(--wd-background-color-default);
        }

        html {
          height: 100%;
          overflow: auto;
          scrollbar-color: var(--wd-border-color-01) transparent;
          scrollbar-gutter: stable;
          scrollbar-width: thin;
        }
        
        body {
          padding: 0;
          margin: 0;
          border: none;
        }
      </style>
      <script>
        window.$$AGENT = '${agent}';
      </script>
    </head>
    <body><div id="root"></div></body>
  </html>
  `;
}
