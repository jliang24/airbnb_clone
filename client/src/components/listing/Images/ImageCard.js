import React from 'react';
import Modal from '../../Modal';

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

    setTimeout(() => this.props.setActive(false), 10);
  };

  determineStyle = () => {
    if (this.state.currentHover) {
      return {
        border: 'solid black 2px',
        transform: `scale(1.1)`,
        transition: 'all .4s linear',
        backgroundColor: 'white'
      };
    } else if (this.props.active) {
      return {
        opacity: '.5',
        zIndex: -10,
        position: 'relative'
      };
    }
    return;
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { description, original } = this.props.image;
    return (
      <div
        className="imgcard"
        style={{
          gridRowEnd: `span ${this.state.spans}`
        }}
      >
        <img
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
            onDismiss={() => this.setState({ showModal: false })}
          />
        )}
      </div>
    );
  }
}

export default ImageCard;
