import { useState } from "react";
import classNames from "classnames";
import './RadioControl.scss'

type RadioControlProps = {
  id: string,
  min: number,
  max: number,
  onChange: (value: number) => void,
  defaultValue?: number,
  className?: string,
  disabled?: boolean,
  label?: string
}

const RadioControl = (props: RadioControlProps) => {
  const { min, max, defaultValue, className, disabled, id, label } = props;
  const [fillValue, setFillValue] = useState(defaultValue || 0);
  const color = disabled ? '#808080' : '#1899D6'

  const onChange = (value: string) => {
    const newValue = Number(value);

    setFillValue((newValue - min) / (max - min) * 100);
    props.onChange(newValue);
  }

  return (
    <div className={classNames('radio-control_container', className)}>
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

export default RadioControl;
