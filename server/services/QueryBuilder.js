class QueryBuilder {
  constructor() {
    this.searchQuery = {};
    this.datesQuery = {};
    this.guestsQuery = {};
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
    this.guestsQuery = { [query]: numGuests };
    return this;
  }

  dates(dates) {
    if (!dates) return this;
    const query = 'details.includedDates';
  }

  build() {
    return { ...this.searchQuery, ...this.guestsQuery };
  }
}

module.exports = QueryBuilder;
