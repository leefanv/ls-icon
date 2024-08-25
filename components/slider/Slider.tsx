import { useState, useEffect, useMemo } from "react";
import * as RSlider from "@radix-ui/react-slider";

import styles from "./Slider.module.scss";

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onInput?: (value: number[]) => void;
  onChange?: (value: number[]) => void;
}

function Slider({
  value,
  defaultValue,
  min,
  max,
  step,
  onInput = () => {},
  onChange = () => {},
}: SliderProps) {
  const [localValue, setLocalValue] = useState(defaultValue)

  function getValue(value) {
    if (value && value.length) {
      return value[0]
    }
  }

  function handleChange(value) {
    const current = getValue(value)
    onChange(current)
  }

  function handleInput(value) {
    const current = getValue(value)
    setLocalValue(current)
    onInput(current)
  }

  const currentValue = value !== undefined ? value : localValue

  return (
    <div className={styles.slider}>
      <RSlider.Root
        className={styles.root}
        defaultValue={defaultValue !== undefined ? [defaultValue] : undefined}
        value={value !== undefined ? [value] : undefined}
        min={min}
        max={max}
        step={step}
        onValueChange={handleInput}
        onValueCommit={handleChange}
      >
        <RSlider.Track className={styles.track}>
          <RSlider.Range className={styles.range} />
        </RSlider.Track>
        <RSlider.Thumb className={styles.thumb} aria-label="Volume" />
      </RSlider.Root>
      <span className={styles.value}>{currentValue}</span>
    </div>
  );
}

export default Slider;
