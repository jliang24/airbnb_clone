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
    const { startDate, endDate } = JSON.parse(dates);
    console.log(startDate);
    console.log(dates);
    const startDateQuery = 'details.includedDates';
    const endDateQuery = 'details.endDate';
    this.datesQuery = {
      $and: [
        { [startDateQuery]: { $gte: startDate } },
        { [startDateQuery]: { $gte: endDate } }
      ]
    };
    console.log(this.datesQuery);
    return this;
  }

  build() {
    return { ...this.searchQuery, ...this.guestsQuery, ...this.datesQuery };
  }
}

module.exports = QueryBuilder;
