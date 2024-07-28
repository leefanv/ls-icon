import { useEffect, useState } from "react";
import Iframe from "react-frame-component";

import getFrameDefaultContent from "./frameDefaultContent";

import styles from "./PC.module.scss";

function PC({ height = 200, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  function renderFrame(key, node) {
    return (
      <Iframe
        key={key}
        className={styles.iframe}
        style={{ height: `${height}px` }}
        mountTarget="#root"
        initialContent={getFrameDefaultContent("pc")}
      >
        {node}
      </Iframe>
    );
  }

  if (!visible) {
    return renderFrame('frame-placeholder', <span />)
  }

  return renderFrame('frame', children)
}

export default PC;
