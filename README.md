# Handelser

An event calendar and map that lets you know when your favorite bands are in your area.

## Team

  - __Product Owner__: Alberto D'Souza (ardsouza)
  - __Scrum Master__: Matthew Jacobs (CubeSquared)
  - __Development Team Members__: Jammie Mountz (jammiemountz), Kyle Rokita (futbalguy)


## Table of Contents

1. [Usage](#Usage)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Once you've created a user account, you can create events, follow other users and edit your profile by clicking on the righthand dropdown menu. Clicking on events in the calendar will cause their details to appear in the righthand panel.

In both the map and the calendar, you can filter events by location, distance and creator by using the built-in search fields.

## Development

Our project primarily uses Backbone for front end functionality (with Bootstrap for styling), and uses Express, Postgresql and Bookshelf for the server, which runs on Node.

### Installing Dependencies

From within the root directory:

sudo npm install -g bower
npm install
bower install

### Install and run PostgreSql

Download and run installer from www.postgresql.org
Run psql

The database will persist unless it is shut down, so if you are using any kind of mock data during development you may find it necessary to delete the tables and let the app recreate them. To do this, simply use:

drop table events;

and

drop table users;

then restart the app.

```

### Start Server

From the root directory, run 'nodemon index.js' in the command line

```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
