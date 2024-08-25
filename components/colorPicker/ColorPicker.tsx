import * as RPopover from "@radix-ui/react-popover";
import { ChromePicker } from "react-color";

import styles from "./ColorPicker.module.scss";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

function ColorPicker({ value, onChange = () => {} }: ColorPickerProps) {
  function handleChange(c) {
    onChange(c.hex);
  }

  return (
    <RPopover.Root>
      <RPopover.Trigger asChild>
        <button
          className={styles.trigger}
          style={{ backgroundColor: value }}
        ></button>
      </RPopover.Trigger>
      <RPopover.Portal>
        <RPopover.Content className={styles.content}>
          <ChromePicker color={value} disableAlpha onChange={handleChange} />
        </RPopover.Content>
      </RPopover.Portal>
    </RPopover.Root>
  );
}

export default ColorPicker;
