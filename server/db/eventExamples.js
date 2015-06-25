// table.string('user_id', 100);
// table.string('name', 255);
// table.string('description', 255);
// table.string('venue', 255);
// table.dateTime('date');
// table.string('address', 255);
// table.string('city', 255);
// table.string('state', 255);
// table.integer('zip');

// MySQL retrieves and displays DATETIME values in 'YYYY-MM-DD HH:MM:SS' format.

var events = [{
  user_id: 1,
  name: 'San Fran Jam',
  description: 'A crazy good time',
  venue: 'Hack Reactor',
  date:'2015-06-19 20:59:59',
  address: '944 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94102',
  lat:37.783624,
  long: -122.408999
},
{
  user_id: 1,
  name: 'San Fran Wham',
  description: 'A sweet time',
  venue: 'Golden Gate Bridge',
  date:'2015-06-18 21:59:59',
  address: 'Some Sight',
  city: 'San Francisco',
  state: 'CA',
  zip: '94103',
  lat:37.791729,
  long: -122.398358
},
{
  user_id: 2,
  name: 'Berkeley Bash',
  description: 'A smart time',
  venue: 'Berkeley',
  date:'2015-06-24 15:59:59',
  address: '200 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94104',
  lat:37.871593,
  long: -122.272747
},
{
  user_id: 3,
  name: 'Whammmy!',
  description: 'A slammin time',
  venue: 'Booty',
  date:'2015-07-01 18:59:59',
  address: '300 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94105',
  lat:37.774929,
  long: -122.419416
},{
  user_id: 3,
  name: 'Hot Lanta!',
  description: 'A hot time',
  venue: 'Atlanta',
  date:'2015-07-01 20:59:59',
  address: 'Someplace',
  city: 'Atlanta',
  state: 'GA',
  zip: '94105',
  lat:33.748995,
  long: -84.387982
}];

module.exports = events;