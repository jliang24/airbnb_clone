import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';

import TableItems from './TableItems';

class MapTable extends Component {
  state = { list: [] };

  componentDidUpdate() {
    this.mapListValues();
  }

  mapListValues = () => {
    if (this.props.listings.length <= 0 || this.state.list.length > 0) return;

    const items = this.props.listings.map(listing => {
      const { lat, lng } = listing.location;
      return (
        <TableItems
          moveCenter={() => this.props.moveCenter(lat, lng)}
          key={listing._id}
          listing={listing}
        />
      );
    });

    return this.setState({ list: items });
  };

  renderRow = ({ index, style }) => (
    <div id="list-card" style={style}>
      <img
        id="list-image"
        className="ui image"
        src="http://lorempixel.com/100/100/nature/"
      />
      {this.state.list[index]}
    </div>
  );

  render() {
    return (
      this.state.list.length > 0 && (
        <List height={746} itemCount={10} itemSize={100} width={400}>
          {this.renderRow}
        </List>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    listings: Object.values(state.listings)
  };
};

export default connect(mapStateToProps)(MapTable);
