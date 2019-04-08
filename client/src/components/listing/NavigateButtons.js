import React from 'react';

const NavigateButtons = props => {
  return (
    <div>
      <button className="ui left floated red button " onClick={props.onDismiss}>
        {props.dismiss}
      </button>
      <button
        className="ui right floated primary button"
        onClick={props.onSubmit}
      >
        {props.submit}
      </button>
    </div>
  );
};

export default NavigateButtons;
