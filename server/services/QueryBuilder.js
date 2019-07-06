class QueryBuilder {
  constructor() {
    this.searchQuery = {};
    this.datesQuery = {};
    this.guestsQuery = {};
    this.costQuery = {};
  }

  search(searchConfigs) {
    if (!searchConfigs) return this;
    const { category, value } = JSON.parse(searchConfigs);
    const query = `location.${category}`;
    const queryObj = { [query]: value };
    this.searchQuery = queryObj;
    return this;
  }

  guests(numGuests) {
    if (!numGuests) return this;
    const query = 'details.guests';
    this.guestsQuery = { [query]: { $gte: numGuests } };
    return this;
  }

  cost(numCost) {
    if (!numCost) return this;
    const query = 'location.cost';
    this.costQuery = { [query]: { $lte: numCost } };
    return this;
  }

  dates(dates) {
    if (!dates) return this;
    const { startDate, endDate } = JSON.parse(dates);
    const dateQuery = 'details.includedDates';
    this.datesQuery = {
      $and: [
        { [dateQuery]: { $gte: startDate } },
        { [dateQuery]: { $gte: endDate } }
      ]
    };
    return this;
  }

  build() {
    return {
      ...this.searchQuery,
      ...this.guestsQuery,
      ...this.datesQuery,
      ...this.costQuery
    };
  }
}

module.exports = QueryBuilder;
