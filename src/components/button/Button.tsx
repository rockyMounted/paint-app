import React, { DragEvent, ReactFragment } from "react";
import classNames from "classnames";
import { BUTTON_MODE, BUTTON_APPEARANCE } from "../../constants/constants";
import './Button.scss';

type ButtonProps = {
  label: string,
  onClick: (() => void) | (() => Promise<void>),
  mode?: typeof BUTTON_MODE.LINK,
  href?: string,
  download?: string,
  className?: string,
  appearance?: typeof BUTTON_APPEARANCE.WHITE,
  transparentEffect?: boolean,
  draggable?: boolean,
  onDragStart?: (event: DragEvent<HTMLElement>) => void,
  onDrop?: (event: DragEvent<HTMLElement>) => void,
  onDragEnd?: (event: DragEvent<HTMLElement>) => void,
  onDragOver?: (event: DragEvent<HTMLElement>) => void,
  id?: string
}

const Button = (props: ButtonProps) => {
  const {
    mode,
    label,
    onClick,
    href,
    download,
    className,
    appearance,
    transparentEffect,
    draggable,
    onDragStart,
    onDrop,
    onDragEnd,
    onDragOver,
    id
  } = props;

  return (
    <>
      {
        mode === BUTTON_MODE.LINK
          ? <a
              className={classNames('button link', className, appearance)}
              onClick={onClick}
              href={href}
              download={download}
              draggable={draggable}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              id={id}
            >
            {label}
          </a>
          : <button
            className={classNames('button', className, appearance,
              { 'transparentEffect': transparentEffect })
            }
            onClick={onClick}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            draggable={draggable}
            id={id}
          >
            {label}
          </button>
      }
    </>
  )
}

export default Button;
