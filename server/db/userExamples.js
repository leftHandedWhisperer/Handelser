//these sample users will be loaded when the database does not have an 'users' table (so drop table and restart node if you want to refresh)

var users = [{
  username: 'falloutboy',
  password: '4lyfe',
  city: 'San Francisco'
},
{
  username: 'lefthanded',
  password: 'whisperer',
  city: 'San Francisco'
},
{
  username: 'miley',
  password: 'cyrus',
  city: 'Oakland'
},
{
  username: 'one',
  password: 'direction',
  city: 'San Jose'
},
{
  username: 'George Costanza',
  password: 'bosco',
  city: 'New York'
},
{
  username: 'Kanye',
  password: 'Kanye',
  city: 'N/A'
},
{
  username: 'eight',
  password: 'days',
  city: 'Santa Fe'
}];

module.exports = users;