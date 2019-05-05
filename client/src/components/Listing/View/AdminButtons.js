import React, { Component } from 'react';

class AdminButtons extends Component {
  render() {
    return (
      <div className="ui two column grid">
        <div style={{ padding: '2px 0px' }} className="ui two column row">
          <button
            style={{ borderWidth: '0px !important', marginRight: '0px ' }}
            className="ui basic fluid button column"
            onClick={e => this.props.onEdit(e)}
          >
            Edit
          </button>
          <div className="column" style={{ padding: '0px' }}>
            <button
              to={`listings/delete/${this.props.deleteId}`}
              style={{ marginRight: '0px' }}
              className="fluid  ui red basic button "
              onClick={e => this.props.onDelete(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminButtons;
