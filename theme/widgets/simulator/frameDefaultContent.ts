export default function (id = "root", agent = "pc", style = "") {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        html {
          scrollbar-gutter: unset!important;
        }

        ${style}
      </style>
      <script>
        window.$$AGENT = '${agent}';
        var theme = window.top.document.documentElement.getAttribute("data-theme") || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style["color-scheme"] = theme;
      </script>
    </head>
    <body><div id="${id}"></div></body>
  </html>
  `;
}
