import { useState } from 'react'
import classNames from 'classnames';
import Button from '../button';
import './Modal.scss'

const Modal = () => {
  const [show, setShow] = useState(true);

  const onClose = () => {
    setShow(false);
  };

  return (
    <div className={classNames('modal_container', { 'show': show })}>
      <div className='modal_dialog'>
        <div className='modal_content'>
          <span className='text'>hello! do you want to have some fun?</span>
          <Button
            className='button'
            onClick={() => onClose()}
            label='get started!'
            transparentEffect
          />
        </div>
      </div>
    </div>
  )
}

export default Modal;
