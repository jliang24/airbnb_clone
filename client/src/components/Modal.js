import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss}
      className="ui dimmer fullscreen modals visible active"
    >
      {props.content}
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
