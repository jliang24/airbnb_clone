import React from 'react';
import { connect } from 'react-redux';

import { capitalizeFirstLetter, pluralization } from 'utils/text';
import detailUtils from 'utils/details';

const ListingDetails = ({ details }) => {
  const renderIcons = (num, icon) => {
    const totalIcons = [];
    for (let icons = 0; icons < num; icons++) {
      totalIcons.push(
        <i key={`${icon} ${icons}`} className={`large ${icon} icon`} />
      );
    }
    return totalIcons;
  };

  return (
    <div className="ui page grid listing-grid">
      {detailUtils.keys.map(detailKey => {
        const detailIcon = detailUtils[detailKey];
        const detailNum = details[detailKey];
        return (
          <React.Fragment key={`${detailKey} ${detailNum}`}>
            <div className="listing-detail four wide column bottom aligned content">
              <div>{renderIcons(detailNum, detailIcon)}</div>
              <div>
                <h3>{detailNum}</h3>
              </div>
              {pluralization(capitalizeFirstLetter(detailKey), detailNum)}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    details: state.details
  };
};

export default connect(mapStateToProps)(ListingDetails);
