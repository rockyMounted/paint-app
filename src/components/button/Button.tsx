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
  appearance?: typeof BUTTON_APPEARANCE.WHITE
}

const Button = ({ mode, label, onClick, href, download, className, appearance }: ButtonProps) => (
  <>
    {
      mode === BUTTON_MODE.LINK
        ? <a
            className={classNames('button link', className, appearance)}
            onClick={onClick}
            href={href}
            download={download}
          >
          {label}
        </a>
        : <button className={classNames('button', className, appearance)} onClick={onClick}>{label}</button>
    }
  </>
)

export default Button;
