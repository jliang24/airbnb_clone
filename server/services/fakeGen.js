const faker = require('faker');

console.log(typeof faker.random.number(5));
console.log(typeof faker.fake('{{random.number(5)}}'));
// { pictures: [],
//        _id: 5d1e76a305464a1c5c09a8fd,
//     details: { guests: 2, bedrooms: 0, beds: 0, baths: 0 },
//     location:
//      { title: 'This is the newest',
//        state: 'Delaware',
//      city: 'dfh',
//      cost: 51 } }

const priceRange = JSON.stringify({ min: 10, max: 60 });

const schema = {
  _id: '{{random.uuid}}',
  details: {
    guests: '{{random.number(5)}}',
    bedrooms: '{{random.number(6)}}',
    beds: '{{random.number(5)}}',
    baths: '{{random.number(7)}}'
  },
  location: {
    title: '{{company.catchPhrase}}',
    cost: `{{random.number(${priceRange})}}`
  }
};

class fakeGen {
  constructor() {
    this.data = {};
  }

  generateFakeData(numPoints) {
    this.data = Array.from({ length: numPoints }).map(() => {
      return Object.entries(schema).reduce((acc, entity) => {
        const [key, value] = entity;
        acc[key] =
          typeof value === 'object'
            ? this.extrapolateObject(value)
            : faker.fake(value);
        return acc;
      }, {});
    });
    return this;
  }

  extrapolateObject(obj) {
    const detailInfos = {};
    for (let key in obj) {
      detailInfos[key] = faker.fake(obj[key]);
    }
    return detailInfos;
  }

  randomGeo(lat, lng, radius = 8000) {
    const y0 = lat;
    const x0 = lng;
    const rd = radius / 111300;
    const u = Math.random();
    const v = Math.random();
    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    let newLat = (y + y0).toFixed(5);
    let newLng = (x + x0).toFixed(5);

    return {
      newLat,
      newLng
    };
  }

  createTestData(lat, lng) {
    for (let listing of this.data) {
      const { newLat, newLng } = this.randomGeo(lat, lng);
      listing.location['lat'] = newLat;
      listing.location['lng'] = newLng;
    }
    return this;
  }

  returnData() {
    return this.data;
  }
}

module.exports = fakeGen;
