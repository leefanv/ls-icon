import { useEffect, useState } from "react";
import Iframe from "react-frame-component";

import getFrameDefaultContent from "./frameDefaultContent";

import styles from "./Mobile.module.scss";

function Mobile({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  function renderFrame(key, node) {
    return (
      <div key={key} className={styles.phone}>
        <Iframe
          className={styles.iframe}
          mountTarget="#root"
          initialContent={getFrameDefaultContent("mobile")}
        >
          {node}
        </Iframe>
      </div>
    );
  }

  if (!visible) {
    return renderFrame('frame-placeholder', <span />)
  }

  return renderFrame('frame', children)
}

export default Mobile;
