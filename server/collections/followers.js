var db = require('../db-config');
var Follower = require('../models/follower');

var Followers = new db.Collection();

Followers.model = Follwer;

module.exports = Follwers;
