import { useEffect } from "react";
import { useFrame } from "react-frame-component";

function InjectStyles() {
  const { document: doc } = useFrame();

  function injectStyles() {
    Array.prototype.forEach.call(
      document.querySelectorAll("style"),
      (style) => {
        const frameStyle = style.cloneNode(true);
        // @ts-ignore
        doc.head.appendChild(frameStyle);
      }
    );
  }

  useEffect(() => {
    injectStyles();
  }, []);

  return null;
}

export default InjectStyles;
