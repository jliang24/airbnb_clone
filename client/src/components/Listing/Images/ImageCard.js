import React from 'react';

import Modal from 'components/Modal';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { spans: 0, currentHover: false, showModal: false };

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;

    const spans = Math.ceil(height / 10);

    this.setState({ spans });
  };

  onMouseOver = () => {
    this.setState({ currentHover: true });

    this.props.setActive(true);
  };

  onMouseLeave = () => {
    this.setState({ currentHover: false });

    this.props.setActive(false);
  };

  determineStyle = () => {
    if (this.state.currentHover) {
      return {
        border: 'solid black 2px',
        transform: `scale(1.1)`,
        transition: 'all .4s linear',
        backgroundColor: 'white',
        zIndex: 2,
        position: 'relative'
      };
    } else if (this.props.active) {
      return {
        opacity: '.5',
        position: 'relative'
      };
    }
    return;
  };

  showModal = () => {
    window.scrollTo(0, 0);
    this.setState({ showModal: true });
    document.body.style.overflow = 'hidden';
  };

  onDismiss = () => {
    this.setState({ showModal: false });
    document.body.style.overflow = 'visible';
  };

  render() {
    const { original } = this.props.image;
    return (
      <div
        style={{
          gridRowEnd: `span ${this.state.spans}`
        }}
      >
        <img
          alt={original}
          onMouseEnter={this.onMouseOver}
          onMouseLeave={this.onMouseLeave}
          onClick={() => this.showModal()}
          style={this.determineStyle()}
          ref={this.imageRef}
          src={original}
        />
        {this.state.showModal && (
          <Modal
            content={
              <img
                alt={original}
                style={{
                  maxHeight: '80%',
                  maxWidth: '80%',
                  display: 'inline-block',
                  border: 'solid black 1px'
                }}
                onClick={e => e.stopPropagation()}
                className="image"
                src={original}
              />
            }
            onDismiss={this.onDismiss}
          />
        )}
      </div>
    );
  }
}

export default ImageCard;
