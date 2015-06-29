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
  date:'2015-07-19 20:59:59',
  address: '944 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94102',
  lat: 37.783624,
  long: -122.408999
},
{
  user_id: 1,
  name: 'San Fran Wham',
  description: 'A sweet time',
  venue: 'Golden Gate Bridge',
  date:'2015-07-18 21:59:59',
  address: 'Some Sight',
  city: 'San Francisco',
  state: 'CA',
  zip: '94103',
  lat: 37.791729,
  long: -122.398358
},
{
  user_id: 2,
  name: 'Berkeley Bash',
  description: 'A smart time',
  venue: 'Berkeley',
  date:'2015-07-24 15:59:59',
  address: '200 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94104',
  lat: 37.871593,
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
  lat: 37.774929,
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
  lat: 33.748995,
  long: -84.387982
},{
  user_id: 4,
  name: 'PARTY!!!',
  description: 'Delta Theta House Annual Gathering',
  venue: 'Da Club',
  date:'2015-07-05 20:00:00',
  address: '300 Market St.',
  city: 'Chicago',
  state: 'IL',
  zip: '94105',
  lat:41.8369,
  long: -87.6847
},{
  user_id: 2,
  name: 'Harvest Festival!',
  description: 'Feasting and merriment for all',
  venue: 'Booty',
  date:'2015-07-08 11:00:00',
  address: '300 Market St.',
  city: 'Chicago',
  state: 'IL',
  zip: '94105',
  lat: 41.8289,
  long: -87.6859
},{
  user_id: 3,
  name: 'Firemen\'s Ball!',
  description: 'It will be hot!',
  venue: 'The old Mill',
  date:'2015-07-12 18:59:59',
  address: '41 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94105',
  lat: 37.774972,
  long: -122.419476
},{
  user_id: 3,
  name: 'The Great Howl!',
  description: 'Howling, reading Howl, wolves',
  venue: 'Booty',
  date:'2015-07-19 18:59:59',
  address: '300 Market St.',
  city: 'New York',
  state: 'NY',
  zip: '94105',
  lat: 40.7217,
  long: -74.0079
},{
  user_id: 1,
  name: '48 Hour Hackathon!',
  description: 'Last time someone solved P vs NP. What will you do?',
  venue: 'Hack Reactor East',
  date:'2015-07-26 18:59:59',
  address: '944 Market St.',
  city: 'New York',
  state: 'NY',
  zip: '94105',
  lat: 40.7210,
  long: -74.0049
},{
  user_id: 3,
  name: 'Horse Whisperer\'s Ball!',
  description: 'Learn to whisper to horses, dance',
  venue: 'Booty',
  date:'2015-07-30 18:59:59',
  address: '300 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94105',
  lat: 37.774986,
  long: -122.419401
},{
  user_id: 4,
  name: 'Mosquito Study Lecture!',
  description: 'A sober discussion of the ecological role of mosquitos in North America',
  venue: 'Booty',
  date:'2015-07-15 18:59:59',
  address: '300 Market St.',
  city: 'New York',
  state: 'NY',
  zip: '94105',
  lat: 40.7155,
  long: -74.0051
},{
  user_id: 2,
  name: 'Bullet Train Opening',
  description: 'We have bulletproof coffee',
  venue: 'City Hall',
  date:'2015-07-24 12:59:59',
  address: '944 Market St.',
  city: 'Des Moines',
  state: 'IA',
  zip: '94102',
  lat: 41.5980,
  long: -93.62081
},{
  user_id: 1,
  name: 'Space Shuttle Launch',
  description: 'A crazy good time',
  venue: 'Hack Reactor',
  date:'2015-07-8 20:59:59',
  address: '944 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94102',
  lat: 37.783624,
  long: -122.40900
}];

module.exports = events;