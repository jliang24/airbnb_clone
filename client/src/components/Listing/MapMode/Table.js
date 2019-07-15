import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';

import TableItems from './TableItems';

class MapTable extends Component {
  constructor(props) {
    super(props);
    this.list = [];
  }

  componentDidUpdate() {
    this.mapListValues();
  }

  mapListValues = () => {
    if (this.props.listings.length <= 0) return;
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
    this.list = items;
  };

  renderRow = ({ index, style }) => (
    <div style={style}> {this.list[index]}</div>
  );

  render() {
    return (
      <List height={500} itemCount={10} itemSize={100} width={400}>
        {this.renderRow}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    listings: Object.values(state.listings)
  };
};

export default connect(mapStateToProps)(MapTable);
