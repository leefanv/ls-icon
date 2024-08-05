import { useEffect, useState } from "react";
import Iframe from "react-frame-component";
import Status from "@/assets/images/state.svg";

import getFrameDefaultContent from "./frameDefaultContent";

import styles from "./Mobile.module.scss";

function Mobile({ children }) {
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    setIframeContent(
      getFrameDefaultContent("mobile", "body { padding: 32px 0 0 0 }")
    );
  }, []);

  function renderFrame(key, node) {
    return (
      <div key={key} className={styles.phone}>
        <div className={styles.content}>
          <div className={styles.glass} />
          <Status className={styles.status} />
          <Iframe
            className={styles.iframe}
            mountTarget="#root"
            initialContent={iframeContent}
          >
            {node}
          </Iframe>
        </div>
      </div>
    );
  }


  if (!iframeContent) {
    return renderFrame("frame-placeholder", <span />);
  }

  return renderFrame("frame", children);
}

export default Mobile;
