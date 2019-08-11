import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';

import TableItems from './TableItems';

class MapTable extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
    this.domainURL = `https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/`;
  }

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

  renderRow = ({ index, style }) => {
    const listing = this.props.listings[index];
    const pictures = listing
      ? this.domainURL + listing.pictures[0]
      : `http://lorempixel.com/200/200/city/${index}`;

    return (
      <div id="list-card" style={style}>
        <img
          id="list-image"
          className="ui image"
          src={pictures}
          alt="place pic"
        />
        {this.state.list[index]}
      </div>
    );
  };

  render() {
    return (
      this.state.list.length > 0 && (
        <List
          height={746}
          itemCount={this.state.list.length}
          itemSize={115}
          width={400}
        >
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
