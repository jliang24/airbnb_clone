const faker = require('faker');

// { pictures: [],
//        _id: 5d1e76a305464a1c5c09a8fd,
//     details: { guests: 2, bedrooms: 0, beds: 0, baths: 0 },
//     location:
//      { title: 'This is the newest',
//        state: 'Delaware',
//      city: 'dfh',
//      cost: 51 } }

const extrapolateObject = obj => {
  const detailInfos = {};
  for (let key in obj) {
    detailInfos[key] = faker.fake(obj[key]);
  }
  return detailInfos;
};

const schema = {
  lastName: '{{name.lastName}}',
  firstName: '{{name.firstName}}',
  zipcode: '{{address.zipCode}}',
  details: {
    guests: '{{name.lastName}}',
    bedrooms: '{{name.jobTitle}}'
  }
};

const generateFakeData = num => {
  return Array.from({ length: num }).map(() => {
    return Object.entries(schema).reduce((acc, entity) => {
      const [key, value] = entity;
      acc[key] =
        typeof value === 'object'
          ? extrapolateObject(value)
          : faker.fake(value);
      return acc;
    }, {});
  });
};

module.exports = generateFakeData;
