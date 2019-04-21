import React from 'react';

const NavigateButtons = props => {
  return (
    <div style={{ marginTop: '5px' }}>
      <button className="ui left floated red button " onClick={props.onDismiss}>
        {props.dismiss}
      </button>
      <button
        className="ui right floated primary button"
        onClick={props.onSubmit}
      >
        {props.loading ? (
          <>
            <div
              style={{ height: '15px', marginLeft: '-5px', marginTop: '-10px' }}
              className="ui small active inline loader"
            />
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              Loading
            </div>
          </>
        ) : (
          props.submit
        )}
      </button>
    </div>
  );
};

export default NavigateButtons;
