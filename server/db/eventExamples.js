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
  zip: 94102
},
{
  user_id: 1,
  name: 'San Fran Wham',
  description: 'A sweet time',
  venue: 'Golden Gate Bridge',
  date:'2015-06-18 21:59:59',
  address: '400 Market St.',
  city: 'San Francisco',
  state: 'CA',
  zip: 94103
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
  zip: 94104
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
  zip: 94105
}];

module.exports = events;