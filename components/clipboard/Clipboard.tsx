import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import Clip from "clipboard";

interface ClipboardProps {
  id?: string;
}

function Clipboard({ id = "clipboard" }: ClipboardProps, ref) {
  const text = useRef('')
  const buttonEl = useRef(null)

  useEffect(() => {
    new Clip(`#${id}`, {
      text: () => {
        return text.current
      },
    })
  }, [])

  useImperativeHandle(ref, () => {
    return {
      copy: (data) => {
        text.current = data
        buttonEl.current.click()
      }
    }
  })

  return <button ref={buttonEl} id={id} style={{ display: 'none' }} />
}

export default forwardRef(Clipboard);
