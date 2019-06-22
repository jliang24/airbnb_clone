export default function getState(zipcode) {
  // Ensure param is a string to prevent unpredictable parsing results
  if (typeof zipcode !== 'string') {
    console.log('Must pass the zipcode as a string.');
    return;
  }

  // Ensure you don't parse codes that start with 0 as octal values
  const thiszip = parseInt(zipcode, 10);
  let thisstate = '';

  if (thiszip >= 35000 && thiszip <= 36999) {
    thisstate = 'Alabama';
  } else if (thiszip >= 99500 && thiszip <= 99999) {
    thisstate = 'Alaska';
  } else if (thiszip >= 85000 && thiszip <= 86999) {
    thisstate = 'Arizona';
  } else if (thiszip >= 71600 && thiszip <= 72999) {
    thisstate = 'Arkansas';
  } else if (thiszip >= 90000 && thiszip <= 96699) {
    thisstate = 'California';
  } else if (thiszip >= 80000 && thiszip <= 81999) {
    thisstate = 'Colorado';
  } else if (thiszip >= 6000 && thiszip <= 6999) {
    thisstate = 'Connecticut';
  } else if (thiszip >= 19700 && thiszip <= 19999) {
    thisstate = 'Deleware';
  } else if (thiszip >= 32000 && thiszip <= 34999) {
    thisstate = 'Florida';
  } else if (thiszip >= 30000 && thiszip <= 31999) {
    thisstate = 'Georgia';
  } else if (thiszip >= 96700 && thiszip <= 96999) {
    thisstate = 'Hawaii';
  } else if (thiszip >= 83200 && thiszip <= 83999) {
    thisstate = 'Idaho';
  } else if (thiszip >= 60000 && thiszip <= 62999) {
    thisstate = 'Illinois';
  } else if (thiszip >= 46000 && thiszip <= 47999) {
    thisstate = 'Indiana';
  } else if (thiszip >= 50000 && thiszip <= 52999) {
    thisstate = 'Iowa';
  } else if (thiszip >= 66000 && thiszip <= 67999) {
    thisstate = 'Kansas';
  } else if (thiszip >= 40000 && thiszip <= 42999) {
    thisstate = 'Kentucky';
  } else if (thiszip >= 70000 && thiszip <= 71599) {
    thisstate = 'Louisiana';
  } else if (thiszip >= 3900 && thiszip <= 4999) {
    thisstate = 'Maine';
  } else if (thiszip >= 20600 && thiszip <= 21999) {
    thisstate = 'Maryland';
  } else if (thiszip >= 1000 && thiszip <= 2799) {
    thisstate = 'Massachusetts';
  } else if (thiszip >= 48000 && thiszip <= 49999) {
    thisstate = 'Michigan';
  } else if (thiszip >= 55000 && thiszip <= 56999) {
    thisstate = 'Minnesota';
  } else if (thiszip >= 38600 && thiszip <= 39999) {
    thisstate = 'Mississippi';
  } else if (thiszip >= 63000 && thiszip <= 65999) {
    thisstate = 'Missouri';
  } else if (thiszip >= 59000 && thiszip <= 59999) {
    thisstate = 'Montana';
  } else if (thiszip >= 27000 && thiszip <= 28999) {
    thisstate = 'North Carolina';
  } else if (thiszip >= 58000 && thiszip <= 58999) {
    thisstate = 'North Dakota';
  } else if (thiszip >= 68000 && thiszip <= 69999) {
    thisstate = 'Nebraska';
  } else if (thiszip >= 88900 && thiszip <= 89999) {
    thisstate = 'Nevada';
  } else if (thiszip >= 3000 && thiszip <= 3899) {
    thisstate = 'New Hampshire';
  } else if (thiszip >= 7000 && thiszip <= 8999) {
    thisstate = 'New Jersey';
  } else if (thiszip >= 87000 && thiszip <= 88499) {
    thisstate = 'New Mexico';
  } else if (thiszip >= 10000 && thiszip <= 14999) {
    thisstate = 'New York';
  } else if (thiszip >= 43000 && thiszip <= 45999) {
    thisstate = 'Ohio';
  } else if (thiszip >= 73000 && thiszip <= 74999) {
    thisstate = 'Oklahoma';
  } else if (thiszip >= 97000 && thiszip <= 97999) {
    thisstate = 'Oregon';
  } else if (thiszip >= 15000 && thiszip <= 19699) {
    thisstate = 'Pennsylvania';
  } else if (thiszip >= 300 && thiszip <= 999) {
    thisstate = 'Puerto Rico';
  } else if (thiszip >= 2800 && thiszip <= 2999) {
    thisstate = 'Rhode Island';
  } else if (thiszip >= 29000 && thiszip <= 29999) {
    thisstate = 'South Carolina';
  } else if (thiszip >= 57000 && thiszip <= 57999) {
    thisstate = 'South Dakota';
  } else if (thiszip >= 37000 && thiszip <= 38599) {
    thisstate = 'Tennessee';
  } else if (
    (thiszip >= 75000 && thiszip <= 79999) ||
    (thiszip >= 88500 && thiszip <= 88599)
  ) {
    thisstate = 'Texas';
  } else if (thiszip >= 84000 && thiszip <= 84999) {
    thisstate = 'Utah';
  } else if (thiszip >= 5000 && thiszip <= 5999) {
    thisstate = 'Vermont';
  } else if (thiszip >= 22000 && thiszip <= 24699) {
    thisstate = 'Virgina';
  } else if (thiszip >= 20000 && thiszip <= 20599) {
    thisstate = 'Washington DC';
  } else if (thiszip >= 98000 && thiszip <= 99499) {
    thisstate = 'Washington';
  } else if (thiszip >= 24700 && thiszip <= 26999) {
    thisstate = 'West Virginia';
  } else if (thiszip >= 53000 && thiszip <= 54999) {
    thisstate = 'Wisconsin';
  } else if (thiszip >= 82000 && thiszip <= 83199) {
    thisstate = 'Wyoming';
  } else {
    thisstate = '';
  }
  return thisstate;
}
