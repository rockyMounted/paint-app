import { useState } from "react";
import classNames from "classnames";
import './RangeControl.scss'

type RangeControlProps = {
  id: string,
  min: number,
  max: number,
  onChange: (value: number) => void,
  defaultValue?: number,
  className?: string,
  disabled?: boolean,
  label?: string
}

const DISABLED_COLOR = '#808080';
const DEFAULT_COLOR = '#1899D6'

const RangeControl = (props: RangeControlProps) => {
  const { min, max, defaultValue, className, disabled, id, label } = props;
  const [fillValue, setFillValue] = useState(defaultValue || 0);
  const color = disabled ? DISABLED_COLOR : DEFAULT_COLOR

  const onChange = (value: string) => {
    const newValue = Number(value);

    setFillValue((newValue - min) / (max - min) * 100);
    props.onChange(newValue);
  }

  return (
    <div className={classNames('range-control_container', className)}>
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={(event) => onChange(event.currentTarget.value)}
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${fillValue}%, #fff ${fillValue}%, #fff 100%)`
        }}
      />
    </div>
  )
}

export default RangeControl;
