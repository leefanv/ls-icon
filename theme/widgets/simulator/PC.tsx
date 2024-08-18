import { useEffect, useState, useRef } from "react";
import Iframe from "react-frame-component";
import InjectStyles from "./InjectStyles";

import getFrameDefaultContent from "./frameDefaultContent";

import styles from "./PC.module.scss";

function PC({ height = 200, children }) {
  const frame = useRef();
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    setIframeContent(getFrameDefaultContent("pc"));
  }, []);

  function renderFrame(key, node) {
    return (
      <Iframe
        key={key}
        ref={frame}
        className={styles.iframe}
        style={{ height: `${height}px` }}
        mountTarget="#pc"
        initialContent={iframeContent}
      >
        <>
          <InjectStyles />
          {node}
        </>
      </Iframe>
    );
  }

  if (!iframeContent) {
    return renderFrame("frame-placeholder", <span />);
  }

  return renderFrame("frame", children);
}

export default PC;
