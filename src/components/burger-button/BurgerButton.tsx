import React, { useState } from "react";
import classNames from "classnames";
import "./BurgerButton.scss";

type BurgerButtonProps = {
  onClick: (isOpen: boolean) => void;
  className?: string
}

const BurgerButton = ({ onClick }: BurgerButtonProps) => {
  const [open, setOpen] = useState(false);

  const toggleButton = () => {
    setOpen(!open);
    onClick(!open);
  };

  return (
    <div
      onClick={toggleButton}
      className={classNames("burger-button", { "open": open })}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default BurgerButton;
